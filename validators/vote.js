const { check } = require('express-validator');
const { handleValidator } = require('../utils/handleValidator');

const creatVoteValidator = [
  check('vote').exists().notEmpty().isLength({ min: 1, max: 5 }),
  check('caption_id').exists().notEmpty(),
  check('user_id').exists().notEmpty(),
  (req, res, next) => handleValidator(req, res, next)
];

const requestVoteValidator = [
  check('id').exists().notEmpty(),
  (req, res, next) => handleValidator(req, res, next)
];

const updateVoteValidator = [
  check('vote').exists().notEmpty().isLength({ min: 1, max: 5 }),
  (req, res, next) => handleValidator(req, res, next)
];

module.exports = {
  requestVoteValidator,
  creatVoteValidator,
  updateVoteValidator
};
