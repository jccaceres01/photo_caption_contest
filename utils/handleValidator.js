const { validationResult } = require('express-validator');

const handleValidator = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(422).json({ errors: error.array() });
  }
};

module.exports = {
  handleValidator
};
