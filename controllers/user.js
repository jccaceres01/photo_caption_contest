const { matchedData } = require('express-validator');
const { User } = require('../models');
const { hashPassword } = require('../utils/handlePassword');

/**
 * Get all users
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
};

/**
 * Get user by id
 * @param {*} req
 * @param {*} res
 */
const getUser = async (req, res) => {
  const { id } = matchedData(req);
  const user = await User.findByPk(id);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).json('No user found');
  }
};

/**
 * Create user
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
  try {
    req = matchedData(req);
    const hashedPassword = await hashPassword(req.password);
    const data = { ...req, password: hashedPassword };
    const exists = await User.findOne({ where: { email: data.email } });
    if (exists) {
      return res.status(422).json({
        errors: [
          {
            type: 'field',
            value: '',
            msg: 'Invalid value',
            path: 'name',
            location: 'body'
          }
        ]
      });
    }

    const user = await User.create(data);
    if (user) {
      return res.status(201).json(user);
    } else {
      return res.status(422).json('Error creating user');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

/**
 * Update user
 * @param {*} req
 * @param {*} res
 */
const updateUser = async (req, res) => {
  req = matchedData(req);
  const { id } = req;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json('User not found');
  user.update(req);
  return res.json(user);
};

/**
 * Delete an user
 * @param {*} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {
  req = matchedData(req);
  const { id } = req;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json('User not found');
  await user.destroy({ where: id });
  return res.json({ status: 'deleted', id: user.id });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
