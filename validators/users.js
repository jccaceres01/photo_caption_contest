const { check } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

const createUserValidator = [
  check('name').exists().notEmpty(),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 5, max: 25 }),
  (req, res, next) => handleValidator(req, res, next)
];

const loginValidator = [
  check('email').exists().notEmpty(),
  check('password').exists().notEmpty(),
  (req, res, next) => handleValidator(req, res, next)
];

const requestUserValidator = [
  check('id').exists().notEmpty(),
  (req, res, next) => handleValidator(req, res, next)
];

module.exports = {
  loginValidator,
  requestUserValidator,
  createUserValidator
};
