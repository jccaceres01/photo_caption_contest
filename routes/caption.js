const express = require('express');
const router = express.Router();
const {
  getCaptions,
  getCaption,
  createCaption,
  updateCaption,
  deleteCaption,
  getAllCaptionsVotes
} = require('../controllers/caption');

const { upload } = require('../utils/handleStorage');
const { validateToken } = require('../utils/handleToken');

const {
  createCaptionValidator,
  requestCaptionValidator,
  UpdateCaptionValidator
} = require('../validators/caption');

/**
 * Restful routes
 */
router.get('/', validateToken, getCaptions);
router.get('/:id', validateToken, requestCaptionValidator, getCaption);
router.post('/', validateToken, upload.single('photo'), createCaptionValidator, createCaption);
router.put('/:id', validateToken, requestCaptionValidator, UpdateCaptionValidator, updateCaption);
router.delete('/:id', requestCaptionValidator, deleteCaption);

/**
 * Other routes
 */
router.get('/:id/votes', requestCaptionValidator, getAllCaptionsVotes);

module.exports = router;
