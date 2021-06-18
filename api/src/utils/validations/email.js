const validator = require("express-validator");

const { check } = validator;

module.exports.emailValidator = check("email")
  .isEmail({ domain_specific_validation: true })
  .withMessage("Please enter a valid email address");
