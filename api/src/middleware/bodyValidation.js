const validator = require("express-validator");

const { validationResult } = validator;

module.exports.validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  let errors = validationResult(req);

  if (errors.isEmpty()) return next();

  errors = errors.array().map(({ param, msg }) => ({ [`${param}`]: msg }));

  return res.status(400).json({ errors });
};
