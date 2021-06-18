const router = require("express").Router();
const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = require("../utils/env");

sgMail.setApiKey(SENDGRID_API_KEY);

router.post("/", async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    sgMail.send({
      from: "halcika_7@hotmail.com",
      to: "harisbeslic32@gmail.com",
      subject: "Contact Form",
      html: `<h1>Contact Form</h1>
          <br />
          <h2>Reply to: ${email}</h2>
          <h2>Name: ${name}</h2>
          <h2>Subject: ${subject}</h2>
          <h2>Message</h2>
          <br />
          <p>${message}</p>
          `,
    });
    return res.status(200).json({ message: "Message sent" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
