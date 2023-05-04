const { matchedData } = require('express-validator');
const { Vote } = require('../models');

/**
 * Get all votes
 * @param {*} req
 * @param {*} res
 */
const getVotes = async (req, res) => {
  const votes = await Vote.findAll();
  return res.json(votes);
};

/**
 * Get vote by id
 * @param {*} req
 * @param {*} res
 */
const getVote = async (req, res) => {
  const { id } = matchedData(req);
  const vote = await Vote.findByPk(id);
  if (vote) {
    return res.json(vote);
  } else {
    return res.status(404).json('No vote found');
  }
};

/**
 * Create vote
 * @param {*} req
 * @param {*} res
 */
const createVote = async (req, res) => {
  try {
    req = matchedData(req);
    const vote = await Vote.create(req);
    if (vote) {
      return res.status(201).json(vote);
    } else {
      return res.status(422).json('Error creating vote');
    }
  } catch (err) {
    console.log(err);
    switch (err.code) {
      default:
        res.status(500).json(err.message);
    }
  }
};

/**
 * Update vote
 * @param {*} req
 * @param {*} res
 */
const updateVote = async (req, res) => {
  req = matchedData(req);
  const { id } = req;
  const vote = await Vote.findByPk(id);
  if (!vote) return res.status(404).json('Vote not found');
  vote.update(req);
  return res.json(vote);
};

/**
 * Delete an vote
 * @param {*} req
 * @param {*} res
 */
const deleteVote = async (req, res) => {
  req = matchedData(req);
  const { id } = req;
  const vote = await Vote.findByPk(id);
  if (!vote) return res.status(404).json('Vote not found');
  await vote.destroy({ where: id });
  return res.json({ status: 'deleted', id: vote.id });
};

module.exports = {
  getVotes,
  getVote,
  createVote,
  updateVote,
  deleteVote
};
