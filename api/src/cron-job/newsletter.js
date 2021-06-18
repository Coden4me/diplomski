const NewsLetter = require("../db/models/newsletter");
const Product = require("../db/models/product");
const sgMail = require("@sendgrid/mail");
const pug = require("pug");
const { join } = require("path");
const { SENDGRID_API_KEY } = require("../utils/env");
const { connect } = require("../db/db-connect");
const env = require("../utils/env");

sgMail.setApiKey(SENDGRID_API_KEY);

const fn = async () => {
  await connect(env.db_uri);
  const allEmails = await NewsLetter.find({});

  const emails = allEmails.map((a) => a.email);

  const products = await Product.aggregate([
    {
      $match: {
        $or: [
          { "konzum.oldPrice": { $ne: null } },
          { "amko.oldPrice": { $ne: null } },
          { "ebios.oldPrice": { $ne: null } },
        ],
      },
    },
    { $sample: { size: 8 } },
    {
      $project: {
        name: 1,
        img1: "$konzum.image",
        img2: "$amko.image",
        img3: "$ebios.image",
      },
    },
  ]);

  if (products.length) {
    const products1 = products.splice(0, 2);
    const products2 = products.splice(0, 2);
    const products3 = products.splice(0, 2);
    const products4 = products.splice(0, 2);
    const filePath = join(__dirname, `../emails/newsletter.pug`);
    await sgMail.send({
      to: emails,
      from: "halcika_7@hotmail.com",
      subject: "Newsletter",
      html: pug.renderFile(filePath, {
        products1,
        products2,
        products3,
        products4,
      }),
    });
  }
};

fn();
