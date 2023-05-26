const path = require('path');
const { matchedData } = require('express-validator');
const { Photo, User, Caption, Vote } = require('../models');
const fs = require('fs');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 10000, useClones: false });

const IMAGES_URL = `${process.env.BASE_URL}/images/`;
const IMAGES_PATH = path.resolve(__dirname, '../storage/images');

/**
 * Get all photos
 * @param {*} req
 * @param {*} res
 */
const getPhotos = async (req, res) => {
  if (cache.has('photos')) {
    console.log('Response from cache');
    return res.json(cache.get('photos'));
  } else {
    const photos = await Photo.findAll({
      include: [
        { model: User },
        { model: Caption, include: [{ model: Vote }] }
      ]
    });
    const photosWithImagesPath = photos.map(photo => {
      const photoWithImageUrl = { ...photo.dataValues, image_url: `${IMAGES_URL}/${photo.filename}` };
      return photoWithImageUrl;
    });
    cache.set('photos', photosWithImagesPath);
    res.json(photosWithImagesPath);
  }
};

/**
 * Get photo by id
 * @param {*} req
 * @param {*} res
 */
const getPhoto = async (req, res) => {
  const { id } = matchedData(req);
  const photo = await Photo.findByPk(id, {
    include: [
      { model: User },
      { model: Caption, include: [{ model: Vote }] }
    ]
  });
  if (photo) {
    const photoWithImageUrl = { ...photo.dataValues, image_url: `${IMAGES_URL}/${photo.filename}` };
    return res.json(photoWithImageUrl);
  } else {
    return res.status(404).json('No photo');
  }
};

/**
 * Create photo
 * @param {*} req
 * @param {*} res
 */
const createPhoto = async (req, res) => {
  try {
    const { file } = req;
    req = matchedData(req);
    const data = {
      user_id: req.user_id,
      filename: file.filename
    };
    const photo = await Photo.create(data);
    if (photo) {
      cache.del('photos');
      const fullInfoPhoto = await Photo.findByPk(photo.id, {
        include: [
          { model: User },
          { model: Caption, include: [{ model: Vote }] }
        ]
      });
      const photoWithImageUrl = { ...fullInfoPhoto.dataValues, image_url: `${IMAGES_URL}/${photo.filename}` };
      return res.status(201).json(photoWithImageUrl);
    } else {
      return res.status(422).json('Error creating photo');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

/**
 * Update Photo
 * @param {*} req
 * @param {*} res
 */
const updatePhoto = async (req, res) => {
};

/**
 * Delete a photo
 * @param {*} req
 * @param {*} res
 */
const deletePhoto = async (req, res) => {
  req = matchedData(req);
  const { id } = req;
  const photoToDelete = await Photo.findByPk(id);
  if (photoToDelete) {
    cache.del('photos');
    fs.unlinkSync(path.join(IMAGES_PATH, photoToDelete.filename));
    await Photo.destroy({ where: { id } });
    return res.json({ status: 'deleted', id });
  } else {
    return res.status(404).json('No photo found to delete');
  }
};

/**
 *
 * Get photo's captions
 */
const getPhotoCaptions = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const photo = await Photo.findByPk(id);
    if (photo) {
      const captions = await photo.getCaptions();
      return res.json(captions);
    } else {
      return res.status(404).json('No photo found');
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

/**
 *
 * Get photo's captions
 */
const getLastPhotos = async (req, res) => {
  try {
    const photos = await Photo.findAll({
      order: [['id', 'DESC']],
      limit: 5
    });

    if (photos) {
      const photosWithImagesPath = photos.map(photo => {
        const photoWithImageUrl = { ...photo.dataValues, image_url: `${IMAGES_URL}/${photo.filename}` };
        return photoWithImageUrl;
      });
      return res.json(photosWithImagesPath);
    } else {
      return res.status(404).json('No photos found');
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = {
  getPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoCaptions,
  getLastPhotos
};
