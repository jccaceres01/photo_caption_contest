const path = require('path');
const { matchedData } = require('express-validator');
const { Photo } = require('../models');
const fs = require('fs');

const IMAGES_URL = `${process.env.BASE_URL}/images/`;
const IMAGES_PATH = path.resolve(__dirname, '../storage/images');

/**
 * Get all photos
 * @param {*} req
 * @param {*} res
 */
const getPhotos = async (req, res) => {
  const photos = await Photo.findAll();
  const photosWithImagesPath = photos.map(photo => {
    const photoWithImageUrl = { ...photo.dataValues, image_url: `${IMAGES_URL}/${photo.filename}` };
    return photoWithImageUrl;
  });
  res.json(photosWithImagesPath);
};

/**
 * Get photo by id
 * @param {*} req
 * @param {*} res
 */
const getPhoto = async (req, res) => {
  const { id } = matchedData(req);
  const photo = await Photo.findByPk(id);
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
  const { file } = req;
  req = matchedData(req);
  const data = {
    user_id: req.user_id,
    filename: file.filename
  };
  const photo = await Photo.create(data);
  if (photo) {
    const photoWithImageUrl = { ...photo.dataValues, image_url: `${IMAGES_URL}/${photo.filename}` };
    return res.staus(201).json(photoWithImageUrl);
  } else {
    return res.status(422).json('Error creating photo');
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
    fs.unlinkSync(path.join(IMAGES_PATH, photoToDelete.filename));
    await Photo.destroy({ where: { id } });
    return res.json({ status: 'deleted', id });
  } else {
    return res.status(404).json('No photo found to delete');
  }
};

module.exports = {
  getPhotos,
  getPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto
};
