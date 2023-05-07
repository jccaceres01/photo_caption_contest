const { matchedData } = require('express-validator');
const { Caption, Vote } = require('../models');

/**
 * Get all caption
 * @param {*} req
 * @param {*} res
 */
const getCaptions = async (req, res) => {
  const caption = await Caption.findAll({
    include: [
      { model: Vote }
    ]
  });
  return res.json(caption);
};

/**
 * Get caption by id
 * @param {*} req
 * @param {*} res
 */
const getCaption = async (req, res) => {
  const { id } = matchedData(req);
  const caption = await Caption.findByPk(id);
  if (caption) {
    return res.json(caption);
  } else {
    return res.status(404).json('No caption found');
  }
};

/**
 * Create caption
 * @param {*} req
 * @param {*} res
 */
const createCaption = async (req, res) => {
  req = matchedData(req);
  const caption = await Caption.create(req);
  if (caption) {
    return res.status(201).json(caption);
  } else {
    return res.status(422).json('Error creating caption');
  }
};

/**
 * Update caption
 * @param {*} req
 * @param {*} res
 */
const updateCaption = async (req, res) => {
  req = matchedData(req);
  const { id } = req;
  const caption = await Caption.findByPk(id);
  if (!caption) return res.status(404).json('Caption not found');
  caption.update(req);
  return res.json(caption);
};

/**
 * Delete an caption
 * @param {*} req
 * @param {*} res
 */
const deleteCaption = async (req, res) => {
  req = matchedData(req);
  const { id } = req;
  const caption = await Caption.findByPk(id);
  if (!caption) return res.status(404).json('Caption not found');
  await caption.destroy({ where: id });
  return res.json({ status: 'deleted', id: caption.id });
};

module.exports = {
  getCaptions,
  getCaption,
  createCaption,
  updateCaption,
  deleteCaption
};
