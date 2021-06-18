const puppeteer = require("puppeteer");
const productSchema = require("../../db/models/product");

module.exports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.ebios.ba/trgovina-2/");

  await new Promise((resolve) => setTimeout(resolve, 10000));
  
  const products = await page.evaluate(() => {
    const getPrice = (val) => Number(val.split("KM")[0].trim());

    const povrce = [
      "blitva",
      "celer",
      "cvekla",
      "grah bijeli",
      "grah šareni",
      "karfiol",
      "krastavac",
      "krompir 10kg",
      "krompir domaći",
      "krompir mladi",
      "krompir",
      "kupus ljubičasti",
      "kupus mladi",
      "luk bijeli",
      "luk crveni",
      "luk mladi",
      "paprika roga",
      "paprika žuta",
      "paradajz",
      "patlidžan",
      "peršun list",
      "prasa",
      "salata zelena",
      "šampinjoni svježi 300gr",
      "mrkva",
      "tikvica",
      "špinat",
    ];

    const sokovi = [
      "sok cvekla sa jabukom",
      "sok jabuka",
      "sok jabuka bistri",
      "sok jabuka bistri cijeđeni prirodni",
      "sok jabuka mutni cijeđeni prirodni",
      "sok kruška",
      "sok mrkva cvekla",
      "sok mrkva s jabukom",
      "sok mrkva sa jabukom",
      "sok mrkva-cvekla sa jabukom cijeđeni prirodni",
      "sok tikva-jabuka cijeđeni prirodni",
    ];

    const brasno = [
      "brašno heljdino integralno-vodenica",
      "brašno ječmeno integralno-vodenica",
      "brašno kukuruzno integralno-vodenica",
      "brašno pšenično integralno-vodenica",
      "brašno raženo integralno-vodenica",
    ];

    const suho_voce = [
      "suha kajsija",
      "suha šljiva",
      "suha smokva",
      "suhe grožđice",
    ];

    const voce = [
      "banana",
      "jabuka gala",
      "jabuka idared",
      "jabuka jonagold",
      "jabuka zlatni delišes",
      "jagoda",
      "kruška",
      "limun",
      "narandža",
    ];

    return [...document.querySelectorAll(".product-grid-item")]
      .map((p) => {
        let lowerName = p
          .querySelector(".product-title > a")
          .innerText.toLowerCase();

        if (
          lowerName.includes("mix") ||
          lowerName.includes("kikiriki") ||
          lowerName.includes("orah jezgra") ||
          lowerName.includes("svježa hurma")
        )
          return null;

        const image = p.querySelector(".product-image-link > img").getAttribute('data-src');
        const priceDoc = p.querySelector(".price");
        let qty = priceDoc.querySelector(".woocommerce-price-suffix").innerText;
        const prices = [
          ...priceDoc.querySelectorAll(".woocommerce-Price-amount"),
        ].map((price) => price.innerText);

        const price =
          prices.length === 2 ? getPrice(prices[1]) : getPrice(prices[0]);
        const oldPrice = prices.length === 2 ? getPrice(prices[0]) : null;

        if (lowerName === "krompir 10 kg") {
          lowerName = "krompir 10kg";
          qty = "vreća";
        } else if (lowerName === "šampinjoni svježi 300gr") {
          lowerName = "šampinjoni";
          qty = "300g";
        } else if (lowerName === "krompir domaći") {
          lowerName = "krompir";
        } else if (lowerName.includes("jagoda")) {
          lowerName = "jagoda";
        }

        let category = "";

        if (povrce.includes(lowerName)) {
          category = "povrće";
        } else if (sokovi.includes(lowerName)) {
          category = "bezalkoholna pića";
        } else if (brasno.includes(lowerName)) {
          category = "brašno";
        } else if (suho_voce.includes(lowerName)) {
          category = "suho voće";
        } else if (voce.includes(lowerName)) {
          category = "voće";
        }

        lowerName = lowerName.trim().replace("  ", " ");

        return {
          qty,
          price,
          oldPrice,
          name: `${lowerName[0].toUpperCase()}${lowerName.slice(1)}`,
          until: null,
          image,
          category,
          available: true,
        };
      })
      .filter((p) => p !== null);
  });

  await Promise.all(
    products.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, ebios: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  await browser.close();
};
