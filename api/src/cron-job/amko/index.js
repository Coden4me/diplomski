const puppeteer = require("puppeteer");
const productSchema = require("../../db/models/product");

const cbBezalkoholna = async (url, page) => {
  await page.goto(url);

  await new Promise((resolve) => setTimeout(resolve, 7000));
  return page.evaluate(async () => {
    let scrollPosition = 0;
    let documentHeight = document.body.scrollHeight;

    while (documentHeight > scrollPosition) {
      window.scrollBy(0, documentHeight);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      scrollPosition = documentHeight;
      documentHeight = document.body.scrollHeight;
    }

    return [...document.querySelectorAll(".product-wrapper")].map((p) => {
      let lowerName = p
        .querySelector(".product-card-name")
        .innerText.toLowerCase();

      if (
        lowerName.includes("0.2") ||
        lowerName.includes("sok bravo") ||
        lowerName.includes("bona") ||
        lowerName.includes("sok od paradajza 1l") ||
        lowerName.includes("sok family") ||
        lowerName.includes("tablete") ||
        lowerName.includes("sok pingo")
      )
        return null;

      const image = p.querySelector(".product-img-wrap > img").src;
      const price = Number(
        p.querySelector(".product-card-price").innerText.split("KM")[0]
      );
      let oldPrice =
        p.querySelector(".product-card-oldPrice")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0]);
      }
      const until =
        p.querySelector(".valid-to-info")?.innerText.split(": ")[1] ?? null;
      const split = lowerName.split(" ");
      const qty = split[split.length - 1].trim().replace(" ", "");
      delete split[split.length - 1];

      if (
        lowerName.includes("0.33") &&
        (lowerName.includes("cola") ||
          lowerName.includes("fanta") ||
          lowerName.includes("pepsi"))
      ) {
        split.push("limenka");
      }

      split.push(qty);

      lowerName = split.join(" ").trim().replace("  ", " ");

      return {
        qty,
        price,
        oldPrice,
        name: `${lowerName[0].toUpperCase()}${lowerName.slice(1)}`,
        until,
        image,
        category: "bezalkoholna pića",
        available: true,
      };
    });
  });
};

const cbAlkoholna = async (url, page) => {
  await page.goto(url);

  await new Promise((resolve) => setTimeout(resolve, 7000));
  return page.evaluate(async () => {
    let scrollPosition = 0;
    let documentHeight = document.body.scrollHeight;

    while (documentHeight > scrollPosition) {
      window.scrollBy(0, documentHeight);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      scrollPosition = documentHeight;
      documentHeight = document.body.scrollHeight;
    }

    return [...document.querySelectorAll(".product-wrapper")].map((p) => {
      let lowerName = p
        .querySelector(".product-card-name")
        .innerText.toLowerCase();

      if (lowerName.includes("6kom") || lowerName.includes("vino kupinovo"))
        return null;

      const image = p.querySelector(".product-img-wrap > img").src;
      const price = Number(
        p.querySelector(".product-card-price").innerText.split("KM")[0]
      );
      let oldPrice =
        p.querySelector(".product-card-oldPrice")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0]);
      }
      const until =
        p.querySelector(".valid-to-info")?.innerText.split(": ")[1] ?? null;
      let qty = "0.187l";

      if (lowerName.includes("0.75l")) {
        lowerName = lowerName.replace("0.75l", "");
        qty = "0.75l";
      } else if (lowerName.includes("0.33l")) {
        lowerName = lowerName.replace("0.33l", "");
        qty = "0.33l";
      } else if (lowerName.includes("0.187l")) {
        lowerName = lowerName.replace("0.187l", "");
        qty = "0.187l";
      } else if (lowerName.includes("1l")) {
        lowerName = lowerName.replace("1l", "");
        qty = "1l";
      } else if (lowerName.includes("0.5l")) {
        lowerName = lowerName.replace("0.5l", "");
        qty = "0.5l";
      } else if (lowerName.includes("2l")) {
        lowerName = lowerName.replace("2l", "");
        qty = "2l";
      } else if (lowerName.includes("0.10l")) {
        lowerName = lowerName.replace("0.10l", "");
        qty = "0.10l";
      }

      if (lowerName.includes("pivo") && qty === "0.187l") {
        qty = "0.5l";
      }

      lowerName = `${lowerName} ${qty}`;

      lowerName = lowerName.trim().replace("  ", " ");

      return {
        qty,
        price,
        oldPrice,
        name: `${lowerName[0].toUpperCase()}${lowerName.slice(1)}`,
        until,
        image,
        category: "alkoholna pića",
        available: true,
      };
    });
  });
};

module.exports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://amkoshop.ba/shop?merch=06.01.01.");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const voce = await page.evaluate(async () => {
    let scrollPosition = 0;
    let documentHeight = document.body.scrollHeight;

    while (documentHeight > scrollPosition) {
      window.scrollBy(0, documentHeight);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      scrollPosition = documentHeight;
      documentHeight = document.body.scrollHeight;
    }
    return [...document.querySelectorAll(".product-wrapper")].map((p) => {
      let lowerName = p
        .querySelector(".product-card-name")
        .innerText.toLowerCase();

      if (lowerName.includes("dinja")) {
        lowerName = "dinja";
      }

      const image = p.querySelector(".product-img-wrap > img").src;
      const price = Number(
        p.querySelector(".product-card-price").innerText.split("KM")[0]
      );
      let oldPrice =
        p.querySelector(".product-card-oldPrice")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0]);
      }
      const until =
        p.querySelector(".valid-to-info")?.innerText.split(": ")[1] ?? null;

      lowerName = lowerName.trim().replace("  ", " ");

      return {
        qty: "/kg",
        price,
        oldPrice,
        name: `${lowerName[0].toUpperCase()}${lowerName.slice(1)}`,
        until,
        image,
        category: "voće",
        available: true,
      };
    });
  });

  await Promise.all(
    voce.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, amko: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  await page.goto("https://amkoshop.ba/shop?merch=06.01.02.");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const povrce = await page.evaluate(async () => {
    let scrollPosition = 0;
    let documentHeight = document.body.scrollHeight;

    while (documentHeight > scrollPosition) {
      window.scrollBy(0, documentHeight);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      scrollPosition = documentHeight;
      documentHeight = document.body.scrollHeight;
    }
    return [...document.querySelectorAll(".product-wrapper")].map((p) => {
      let lowerName = p
        .querySelector(".product-card-name")
        .innerText.toLowerCase();

      const image = p.querySelector(".product-img-wrap > img").src;
      const price = Number(
        p.querySelector(".product-card-price").innerText.split("KM")[0]
      );
      let oldPrice =
        p.querySelector(".product-card-oldPrice")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0]);
      }
      const until =
        p.querySelector(".valid-to-info")?.innerText.split(": ")[1] ?? null;
      let qty = "/kg";

      if (lowerName === "krompir 10kg") {
        qty = "vreća";
      } else if (lowerName.includes("300g")) {
        qty = "300g";
        lowerName = "šampinjoni";
      } else if (lowerName === "bijeli luk") {
        lowerName = "luk bijeli";
      } else if (lowerName === "mladi kupus") {
        lowerName = "kupus mladi";
      } else if (lowerName === "mladi krompir") {
        lowerName = "krompir mladi";
      } else if (lowerName === "grah trešnjo") {
        lowerName = "grah šareni";
      }
      lowerName = lowerName.trim().replace("  ", " ");

      return {
        qty,
        price,
        oldPrice,
        name: `${lowerName[0].toUpperCase()}${lowerName.slice(1)}`,
        until,
        image,
        category: "povrće",
        available: true,
      };
    });
  });

  await Promise.all(
    povrce.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, amko: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  await page.goto("https://amkoshop.ba/shop?merch=06.04.01.");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const suho = await page.evaluate(async () => {
    let scrollPosition = 0;
    let documentHeight = document.body.scrollHeight;

    while (documentHeight > scrollPosition) {
      window.scrollBy(0, documentHeight);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      scrollPosition = documentHeight;
      documentHeight = document.body.scrollHeight;
    }
    return [...document.querySelectorAll(".product-wrapper")].map((p) => {
      let lowerName = p
        .querySelector(".product-card-name")
        .innerText.toLowerCase();

      const image = p.querySelector(".product-img-wrap > img").src;
      const price = Number(
        p.querySelector(".product-card-price").innerText.split("KM")[0]
      );
      let oldPrice =
        p.querySelector(".product-card-oldPrice")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0]);
      }
      const until =
        p.querySelector(".valid-to-info")?.innerText.split(": ")[1] ?? null;
      let qty = "/kg";
      if (lowerName !== "suha šljiva") {
        const split = lowerName.split(" ");
        qty = split[split.length - 1];
        if (split.includes("berny") || split.includes("bony")) {
          delete split[split.length - 2];
        }
        lowerName = split.join(" ").trim();
      }

      lowerName = lowerName.trim().replace("  ", " ");

      return {
        qty,
        price,
        oldPrice,
        name: `${lowerName[0].toUpperCase()}${lowerName.slice(1)}`,
        until,
        image,
        category: "suho voće",
        available: true,
      };
    });
  });

  await Promise.all(
    suho.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, amko: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  await page.goto("https://amkoshop.ba/shop?merch=03.01.05.");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const brasno = await page.evaluate(async () => {
    let scrollPosition = 0;
    let documentHeight = document.body.scrollHeight;

    while (documentHeight > scrollPosition) {
      window.scrollBy(0, documentHeight);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      scrollPosition = documentHeight;
      documentHeight = document.body.scrollHeight;
    }
    return [...document.querySelectorAll(".product-wrapper")].map((p) => {
      let lowerName = p
        .querySelector(".product-card-name")
        .innerText.toLowerCase();

      const image = p.querySelector(".product-img-wrap > img").src;
      const price = Number(
        p.querySelector(".product-card-price").innerText.split("KM")[0]
      );
      let oldPrice =
        p.querySelector(".product-card-oldPrice")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0]);
      }
      const until =
        p.querySelector(".valid-to-info")?.innerText.split(": ")[1] ?? null;
      const split = lowerName.split(" ");
      const qty = split[split.length - 1];
      lowerName = split.join(" ").trim().replace("  ", " ");

      return {
        qty,
        price,
        oldPrice,
        name: `${lowerName[0].toUpperCase()}${lowerName.slice(1)}`,
        until,
        image,
        category: "brašno",
        available: true,
      };
    });
  });

  await Promise.all(
    brasno.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, amko: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  let bz_alk = [];

  let url = "https://amkoshop.ba/shop?merch=01.02.";
  let ps = await cbBezalkoholna(url, page);
  bz_alk.push(ps);

  url = `${url}&p=1`;
  ps = await cbBezalkoholna(url, page);
  bz_alk.push(ps);

  url = `${url}&p=2`;
  ps = await cbBezalkoholna(url, page);
  bz_alk.push(ps);

  url = `${url}&p=3`;
  ps = await cbBezalkoholna(url, page);
  bz_alk.push(ps);

  url = `${url}&p=4`;
  ps = await cbBezalkoholna(url, page);
  bz_alk.push(ps);

  url = `${url}&p=5`;
  ps = await cbBezalkoholna(url, page);
  bz_alk.push(ps);

  bz_alk = bz_alk.flat().filter((item) => item !== null);

  await Promise.all(
    bz_alk.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, amko: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  let products = [];

  url = "https://amkoshop.ba/shop?merch=01.01.";
  ps = await cbAlkoholna(url, page);
  products.push(ps);

  url = `${url}&p=1`;
  ps = await cbAlkoholna(url, page);
  products.push(ps);

  products = products.flat().filter((item) => item !== null);

  await Promise.all(
    products.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, amko: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  await browser.close();
};
