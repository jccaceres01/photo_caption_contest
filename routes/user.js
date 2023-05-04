const express = require('express');
const router = express.Router();
const {
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user');

const { upload } = require('../utils/handleStorage');
const { validateToken } = require('../utils/handleToken');

const {
  requestUserValidator,
  createUserValidator
} = require('../validators/users');

router.get('/:id', validateToken, requestUserValidator, getUser);
router.post('/', upload.single('photo'), createUserValidator, createUser);
router.put('/:id', validateToken, requestUserValidator, createUserValidator, updateUser);
router.delete('/:id', validateToken, requestUserValidator, deleteUser);

module.exports = router;
