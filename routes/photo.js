const express = require('express');
const router = express.Router();
const {
  getPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoCaptions,
  getLastPhotos
} = require('../controllers/photo');

const { upload } = require('../utils/handleStorage');

const {
  requestPhotoValidator,
  createPhotoValidator
} = require('../validators/photo');

const { validateToken } = require('../utils/handleToken');

/**
 * Photos routes
 */
router.get('/', getPhotos);
router.get('/lastest', getLastPhotos);
router.get('/:id', requestPhotoValidator, getPhoto);
router.post('/', validateToken, upload.single('photo'), createPhotoValidator, createPhoto);
router.put('/:id', validateToken, requestPhotoValidator, createPhotoValidator, updatePhoto);
router.delete('/:id', validateToken, requestPhotoValidator, deletePhoto);
router.get('/:id/captions', requestPhotoValidator, getPhotoCaptions);

module.exports = router;
