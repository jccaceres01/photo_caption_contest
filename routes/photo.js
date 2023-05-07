const express = require('express');
const router = express.Router();
const {
  getPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto
} = require('../controllers/photo');

const { upload } = require('../utils/handleStorage');

const {
  requestPhotoValidator,
  createPhotoValidator
} = require('../validators/photo');

const { validateToken } = require('../utils/handleToken');

router.get('/', getPhotos);
router.get('/:id', requestPhotoValidator, getPhoto);
router.post('/', validateToken, upload.single('photo'), createPhotoValidator, createPhoto);
router.put('/:id', validateToken, requestPhotoValidator, createPhotoValidator, updatePhoto);
router.delete('/:id', validateToken, requestPhotoValidator, deletePhoto);

module.exports = router;
