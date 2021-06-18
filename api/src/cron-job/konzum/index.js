const puppeteer = require("puppeteer");
const productSchema = require("../../db/models/product");

const cbKAlk = async (url, page) => {
  await page.goto(url);

  await new Promise((resolve) => setTimeout(resolve, 10000));

  return page.evaluate(async () => {
    return [...document.querySelectorAll("li.item.ng-scope")].map((p) => {
      let lowerName = p.querySelector("a.title > span").innerText.toLowerCase();

      if (
        lowerName.includes("bezalkoholno") ||
        lowerName.includes("0,4l pack limenka") ||
        lowerName.includes("5l bure") ||
        lowerName.includes("0,5x4") ||
        lowerName.includes("0.5l 4/1") ||
        lowerName.includes("0.5l 5+1") ||
        lowerName.includes("0,5lx4") ||
        lowerName.includes("pivo 2l") ||
        lowerName.includes("4x0,5l") ||
        lowerName.includes("6/1") ||
        lowerName.includes("0,7l+2") ||
        lowerName.includes("0.2") ||
        lowerName.includes("0,2") ||
        lowerName.includes("0,1") ||
        lowerName.includes("0.1") ||
        lowerName.includes("0.04") ||
        lowerName.includes("0,04")
      )
        return null;

      const image = p.querySelector(".image").src;
      const splitedPrice = p.querySelector(".price").innerText.split("KM");
      const price = Number(splitedPrice[0].trim().replace(",", "."));
      let oldPrice = p.querySelector(".info > div del")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0].trim().replace(",", "."));
      }
      const until =
        p.querySelector(".action_duration span")?.innerText.split(" do ")[1] ??
        null;

      const available = p.querySelector("p.em.pt_xs.pb_xl.clr_dist.ng-binding")
        ? false
        : true;

      let qty = "1l";

      if (lowerName.includes("0.7l") || lowerName.includes("0,7l")) {
        const to_remove = lowerName.includes("0.7l") ? "0.7l" : "0,7l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.7l";
      } else if (lowerName.includes("0.75l") || lowerName.includes("0,75l")) {
        const to_remove = lowerName.includes("0.75l") ? "0.75l" : "0,75l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.75l";
      } else if (lowerName.includes("0.33l") || lowerName.includes("0,33l")) {
        const to_remove = lowerName.includes("0.33l") ? "0.33l" : "0,33l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.33l";
      } else if (lowerName.includes("1l") || lowerName.includes("1 l")) {
        const to_remove = lowerName.includes("1l") ? "1l" : "1 l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "1l";
      } else if (lowerName.includes("0.5l") || lowerName.includes("0,5l")) {
        const to_remove = lowerName.includes("0.5l") ? "0.5l" : "0,5l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.5l";
      } else if (lowerName.includes("2l")) {
        lowerName = lowerName.replace("2l", "");
        qty = "2l";
      } else if (lowerName.includes("0.355l") || lowerName.includes("0,355l")) {
        const to_remove = lowerName.includes("0.355l") ? "0.355l" : "0,355l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.355l";
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
        available,
      };
    });
  });
};

const cbKBezAlk = async (url, page) => {
  await page.goto(url);

  await new Promise((resolve) => setTimeout(resolve, 10000));

  return page.evaluate(async () => {
    return [...document.querySelectorAll("li.item.ng-scope")].map((p) => {
      let lowerName = p.querySelector("a.title > span").innerText.toLowerCase();

      if (
        lowerName.includes("4x0,33l") ||
        lowerName.includes("4 x 0,33l") ||
        lowerName.includes("4/1") ||
        lowerName.includes("0.2") ||
        lowerName.includes("0,2") ||
        lowerName.includes("0,4") ||
        lowerName.includes("1,2l") ||
        lowerName.includes("400ml") ||
        lowerName.includes("710ml") ||
        lowerName.includes("bravo") ||
        lowerName.includes("bona") ||
        lowerName.includes("pingo") ||
        lowerName.includes("energ napit") ||
        lowerName.includes("family") ||
        lowerName.includes("coca cola energetski napitak")
      )
        return null;

      const image = p.querySelector(".image").src;
      const splitedPrice = p.querySelector(".price").innerText.split("KM");
      const price = Number(splitedPrice[0].trim().replace(",", "."));
      let oldPrice = p.querySelector(".info > div del")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0].trim().replace(",", "."));
      }
      const until =
        p.querySelector(".action_duration span")?.innerText.split(" do ")[1] ??
        null;

      const available = p.querySelector("p.em.pt_xs.pb_xl.clr_dist.ng-binding")
        ? false
        : true;

      let qty = "0.5l";

      if (lowerName.includes("1l")) {
        lowerName = lowerName.replace("1l", "");
        qty = "1l";
      } else if (lowerName.includes("2l")) {
        lowerName = lowerName.replace("2l", "");
        qty = "2l";
      } else if (lowerName.includes("5l")) {
        lowerName = lowerName.replace("5l", "");
        qty = "5l";
      } else if (lowerName.includes("500gr")) {
        lowerName = lowerName.replace("500gr", "");
        qty = "500g";
      } else if (lowerName.includes("200gr")) {
        lowerName = lowerName.replace("200gr", "");
        qty = "200g";
      } else if (lowerName.includes("75gr")) {
        lowerName = lowerName.replace("75gr", "");
        qty = "75g";
      } else if (lowerName.includes("0.33l") || lowerName.includes("0,33l")) {
        const to_remove = lowerName.includes("0.33l") ? "0.33l" : "0,33l";
        lowerName = lowerName.replace(to_remove, "");
        if (
          (lowerName.includes("cola") ||
            lowerName.includes("fanta") ||
            lowerName.includes("schweppes")) &&
          !lowerName.includes("limenka")
        ) {
          lowerName = `${lowerName} limenka`;
        }
        qty = "0.33l";
      } else if (lowerName.includes("0.355l") || lowerName.includes("0,355l")) {
        const to_remove = lowerName.includes("0.355l") ? "0.355l" : "0,355l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.355l";
      } else if (lowerName.includes("0.5l") || lowerName.includes("0,5l")) {
        const to_remove = lowerName.includes("0.5l") ? "0.5l" : "0,5l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.5l";
      } else if (lowerName.includes("0.72l") || lowerName.includes("0,72l")) {
        const to_remove = lowerName.includes("0.72l") ? "0.72l" : "0,72l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.72l";
      } else if (lowerName.includes("0.75l") || lowerName.includes("0,75l")) {
        const to_remove = lowerName.includes("0.75l") ? "0.75l" : "0,75l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.75l";
      } else if (lowerName.includes("0.7l") || lowerName.includes("0,7l")) {
        const to_remove = lowerName.includes("0.7l") ? "0.7l" : "0,7l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "0.7l";
      } else if (lowerName.includes("1.25l") || lowerName.includes("1,25l")) {
        const to_remove = lowerName.includes("1.25l") ? "1.25l" : "1,25l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "1.25l";
      } else if (lowerName.includes("2.5l") || lowerName.includes("2,5l")) {
        const to_remove = lowerName.includes("2.5l") ? "2.5l" : "2,5l";
        lowerName = lowerName.replace(to_remove, "");
        qty = "2.5l";
      } else if (lowerName.includes("1kg") || lowerName.includes("1000gr")) {
        const to_remove = lowerName.includes("1kg") ? "1kg" : "1000gr";
        lowerName = lowerName.replace(to_remove, "");
        qty = "1kg";
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
        category: "bezalkoholna pića",
        available,
      };
    });
  });
};

module.exports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.konzumshop.ba/#!/categories/5471597/povrce?show=all&sort_field=soldStatistics&sort=soldStatisticsDesc&page=1&per_page=200"
  );

  await new Promise((resolve) => setTimeout(resolve, 10000));

  const povrce = await page.evaluate(async () => {
    return [...document.querySelectorAll("li.item.ng-scope")].map((p) => {
      let lowerName = p.querySelector("a.title > span").innerText.toLowerCase();

      const image = p.querySelector(".image").src;
      const splitedPrice = p.querySelector(".price").innerText.split("KM");
      const price = Number(splitedPrice[0].trim().replace(",", "."));
      let oldPrice = p.querySelector(".info > div del")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0].trim().replace(",", "."));
      }
      const until =
        p.querySelector(".action_duration span")?.innerText.split(" do ")[1] ??
        null;

      const available = p.querySelector("p.em.pt_xs.pb_xl.clr_dist.ng-binding")
        ? false
        : true;
      let qty = splitedPrice[1] === " / Kg" ? "/kg" : "/ko";

      if (lowerName === "bukovača 350gr k plus") {
        lowerName = "bukovača";
        qty = "350g";
      } else if (lowerName === "luk bijeli rfz") {
        lowerName = "luk bijeli";
      } else if (lowerName === "mrkva rfz") {
        lowerName = "mrkva";
      } else if (lowerName === "paradajz pikolo 500gr") {
        lowerName = "paradajz pikolo";
        qty = "500g";
      } else if (lowerName === "peršun list rfz") {
        lowerName = "peršun list";
      } else if (lowerName === "šampinjoni 350gr konzum") {
        lowerName = "šampinjoni";
        qty = "350g";
      } else if (lowerName === "spinat") {
        lowerName = "špinat";
      } else if (lowerName === "salata rucola 60gr bh food") {
        lowerName = "salata rucola";
        qty = "60g";
      } else if (lowerName === "salata kristal kom") {
        lowerName = "salata kristal";
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
        available,
      };
    });
  });

  await Promise.all(
    povrce.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, konzum: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  await page.goto(
    "https://www.konzumshop.ba/#!/categories/5471583/voce?show=all&sort_field=soldStatistics&sort=soldStatisticsDesc&page=1&per_page=200"
  );

  await new Promise((resolve) => setTimeout(resolve, 10000));

  const voce = await page.evaluate(async () => {
    return [...document.querySelectorAll("li.item.ng-scope")].map((p) => {
      let lowerName = p.querySelector("a.title > span").innerText.toLowerCase();

      const image = p.querySelector(".image").src;
      const splitedPrice = p.querySelector(".price").innerText.split("KM");
      const price = Number(splitedPrice[0].trim().replace(",", "."));
      let oldPrice = p.querySelector(".info > div del")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0].trim().replace(",", "."));
      }
      const until =
        p.querySelector(".action_duration span")?.innerText.split(" do ")[1] ??
        null;

      const available = p.querySelector("p.em.pt_xs.pb_xl.clr_dist.ng-binding")
        ? false
        : true;
      let qty = splitedPrice[1] === " / Kg" ? "/kg" : "/ko";

      if (lowerName === "dinja galija") {
        lowerName = "dinja";
      } else if (lowerName === "avokado kom") {
        lowerName = "avokado";
      } else if (lowerName === "jagoda rfz") {
        lowerName = "jagoda";
      } else if (lowerName === "mango kom") {
        lowerName = "mango";
      } else if (lowerName === "narandža premium") {
        lowerName = "narandža";
      }

      lowerName = lowerName.trim().replace("  ", " ");

      return {
        qty,
        price,
        oldPrice,
        name: `${lowerName[0].toUpperCase()}${lowerName.slice(1)}`,
        until,
        image,
        category: "voće",
        available,
      };
    });
  });

  await Promise.all(
    voce.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, konzum: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  await page.goto(
    "https://www.konzumshop.ba/#!/categories/5471353/brasno?show=all&sort_field=soldStatistics&sort=soldStatisticsDesc&page=1&per_page=200"
  );

  await new Promise((resolve) => setTimeout(resolve, 10000));

  let brasno = await page.evaluate(async () => {
    return [...document.querySelectorAll("li.item.ng-scope")].map((p) => {
      let lowerName = p.querySelector("a.title > span").innerText.toLowerCase();

      if (
        lowerName.includes("griz") ||
        lowerName.includes("kukuruzna") ||
        lowerName.includes("5/1")
      )
        return null;

      const image = p.querySelector(".image").src;
      const splitedPrice = p.querySelector(".price").innerText.split("KM");
      const price = Number(splitedPrice[0].trim().replace(",", "."));
      let oldPrice = p.querySelector(".info > div del")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0].trim().replace(",", "."));
      }
      const until =
        p.querySelector(".action_duration span")?.innerText.split(" do ")[1] ??
        null;

      const available = p.querySelector("p.em.pt_xs.pb_xl.clr_dist.ng-binding")
        ? false
        : true;

      let qty = "1kg";

      if (lowerName.includes("1kg")) {
        lowerName = lowerName.replace("1kg ", "");
        qty = "1kg";
      } else if (lowerName.includes("800gr")) {
        lowerName = lowerName.replace("800gr ", "");
        qty = "800g";
      } else if (lowerName.includes("25kg")) {
        lowerName = lowerName.replace("25kg ", "");
        qty = "25kg";
      } else if (lowerName.includes("2kg")) {
        lowerName = lowerName.replace("2kg ", "");
        qty = "2kg";
      } else if (lowerName.includes("5kg")) {
        lowerName = lowerName.replace("5kg ", "");
        qty = "5kg";
      } else if (lowerName.includes("10kg")) {
        lowerName = lowerName.replace("10kg ", "");
        qty = "10kg";
      } else if (lowerName.includes("250g")) {
        lowerName = lowerName.replace("250g ", "");
        qty = "250g";
      } else if (lowerName.includes("450g")) {
        const to_remove = lowerName.includes("450gr") ? "450gr " : "450g ";
        lowerName = lowerName.replace(to_remove, "");
        qty = "450g";
      }

      if (lowerName.includes("tip-500")) {
        lowerName = lowerName.replace("tip-500", "tip 500");
      } else if (lowerName.includes("tip-550")) {
        lowerName = lowerName.replace("tip-550", "tip 550");
      } else if (lowerName.includes("tip-850")) {
        lowerName = lowerName.replace("tip-850", "tip 850");
      } else if (lowerName.includes("tip-400")) {
        lowerName = lowerName.replace("tip-400", "tip 400");
      } else if (lowerName.includes("tip-1100")) {
        lowerName = lowerName.replace("tip-1100", "tip 1100");
      } else if (lowerName.includes("tip-1250")) {
        lowerName = lowerName.replace("tip-1250", "tip 1250");
      }

      if (lowerName.includes("majić")) {
        lowerName = lowerName.replace("majić", "mlin majić");
      }

      if (lowerName.includes("tip- 400")) {
        lowerName = lowerName.replace("tip- 400", "tip 400");
      }

      lowerName = lowerName.trim().replace("  ", " ");

      return {
        qty,
        price,
        oldPrice,
        name: `${lowerName[0].toUpperCase()}${lowerName.slice(1)}`,
        until,
        image,
        category: "brašno",
        available,
      };
    });
  });

  brasno = brasno.filter((item) => item !== null);

  await Promise.all(
    brasno.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, konzum: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  let alk = [];

  let p1 = await cbKAlk(
    "https://www.konzumshop.ba/#!/categories/5471111/alkoholna-pica?show=all&sort_field=soldStatistics&sort=soldStatisticsDesc&page=1&per_page=200",
    page
  );

  let p2 = await cbKAlk(
    "https://www.konzumshop.ba/#!/categories/5471111/alkoholna-pica?show=all&sort_field=soldStatistics&sort=soldStatisticsDesc&page=2&per_page=200",
    page
  );

  alk.push(p1, p2);

  alk = alk.flat().filter((item) => item !== null);

  await Promise.all(
    alk.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, konzum: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  let bz_alk = [];

  p1 = await cbKBezAlk(
    "https://www.konzumshop.ba/#!/categories/5471141/bezalkoholna-pica?show=all&sort_field=soldStatistics&sort=soldStatisticsDesc&page=1&per_page=200",
    page
  );

  p2 = await cbKBezAlk(
    "https://www.konzumshop.ba/#!/categories/5471141/bezalkoholna-pica?show=all&sort_field=soldStatistics&sort=soldStatisticsDesc&page=2&per_page=200",
    page
  );

  bz_alk.push(p1, p2);

  bz_alk = bz_alk.flat().filter((item) => item !== null);

  await Promise.all(
    bz_alk.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, konzum: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  await page.goto(
    "https://www.konzumshop.ba/#!/categories/5471591/suho-voce-sjemenke-i-orasasto?subcategory=5471592&show=all&sort_field=soldStatistics&sort=soldStatisticsDesc&page=1&per_page=200"
  );

  await new Promise((resolve) => setTimeout(resolve, 10000));

  let products = await page.evaluate(async () => {
    return [...document.querySelectorAll("li.item.ng-scope")].map((p) => {
      let lowerName = p.querySelector("a.title > span").innerText.toLowerCase();

      if (lowerName.includes("rfz")) {
        lowerName = lowerName.replace("rfz", "");
      }

      const image = p.querySelector(".image").src;
      const splitedPrice = p.querySelector(".price").innerText.split("KM");
      const price = Number(splitedPrice[0].trim().replace(",", "."));
      let oldPrice = p.querySelector(".info > div del")?.innerText ?? null;
      if (oldPrice) {
        oldPrice = Number(oldPrice.split("KM")[0].trim().replace(",", "."));
      }
      const until =
        p.querySelector(".action_duration span")?.innerText.split(" do ")[1] ??
        null;

      const available = p.querySelector("p.em.pt_xs.pb_xl.clr_dist.ng-binding")
        ? false
        : true;

      let qty = "1kg";

      if (lowerName.includes("100gr")) {
        lowerName = lowerName.replace("100gr", "");
        qty = "100g";
      } else if (lowerName.includes("90gr")) {
        lowerName = lowerName.replace("90gr", "");
        qty = "90g";
      } else if (lowerName.includes("600g")) {
        lowerName = lowerName.replace("600g", "");
        qty = "600g";
      } else if (lowerName.includes("500gr")) {
        lowerName = lowerName.replace("500gr", "");
        qty = "500g";
      } else if (lowerName.includes("200gr")) {
        lowerName = lowerName.replace("200gr", "");
        qty = "200g";
      } else if (lowerName.includes("250gr")) {
        lowerName = lowerName.replace("250gr", "");
        qty = "250g";
      } else if (lowerName.includes("180gr")) {
        lowerName = lowerName.replace("180gr", "");
        qty = "180g";
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
        category: "suho voće",
        available,
      };
    });
  });

  products = products.flat().filter((item) => item !== null);

  await Promise.all(
    products.map(({ name, category, ...rest }) =>
      productSchema.update(
        { name },
        { name, category, konzum: rest },
        {
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
    )
  );

  await browser.close();
};
