const { check } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

const createCaptionValidator = [
  check('caption').exists().notEmpty(),
  check('style').exists().notEmpty(),
  check('photo_id').exists().notEmpty(),
  check('user_id').exists().notEmpty(),
  (req, res, next) => handleValidator(req, res, next)
];

const UpdateCaptionValidator = [
  check('caption').exists().notEmpty(),
  (req, res, next) => handleValidator(req, res, next)
];

const requestCaptionValidator = [
  check('id').exists().notEmpty(),
  (req, res, next) => handleValidator(req, res, next)
];

module.exports = {
  createCaptionValidator,
  requestCaptionValidator,
  UpdateCaptionValidator
};
