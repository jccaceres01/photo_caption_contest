const { check } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

const createPhotoValidator = [
  check('user_id').exists().notEmpty(),
  (req, res, next) => handleValidator(req, res, next)
];

const requestPhotoValidator = [
  check('id').exists().notEmpty(),
  (req, res, next) => handleValidator(req, res, next)
];

module.exports = {
  requestPhotoValidator,
  createPhotoValidator
};
