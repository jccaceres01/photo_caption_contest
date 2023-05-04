const express = require('express');
const router = express.Router();
const {
  getCaptions,
  getCaption,
  createCaption,
  updateCaption,
  deleteCaption
} = require('../controllers/caption');

const { upload } = require('../utils/handleStorage');
const { validateToken } = require('../utils/handleToken');

const {
  createCaptionValidator,
  requestaptionValidator,
  UpdateCaptionValidator
} = require('../validators/caption');

router.get('/', validateToken, getCaptions);
router.get('/:id', validateToken, requestaptionValidator, getCaption);
router.post('/', validateToken, upload.single('photo'), createCaptionValidator, createCaption);
router.put('/:id', validateToken, requestaptionValidator, UpdateCaptionValidator, updateCaption);
router.delete('/:id', validateToken, requestaptionValidator, deleteCaption);

module.exports = router;
