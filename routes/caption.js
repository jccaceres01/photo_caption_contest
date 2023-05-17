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
  requestaptionValidator,
  UpdateCaptionValidator
} = require('../validators/caption');

/**
 * Restful routes
 */
router.get('/', validateToken, getCaptions);
router.get('/:id', validateToken, requestaptionValidator, getCaption);
router.post('/', validateToken, upload.single('photo'), createCaptionValidator, createCaption);
router.put('/:id', validateToken, requestaptionValidator, UpdateCaptionValidator, updateCaption);
router.delete('/:id', requestaptionValidator, deleteCaption);

/**
 * Other routes
 */
router.get('/:id/votes', requestaptionValidator, getAllCaptionsVotes);

module.exports = router;
