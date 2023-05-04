const express = require('express');
const router = express.Router();

const { loginUser } = require('../controllers/auth');

const { createUser } = require('../controllers/user');
const { loginValidator } = require('../validators/users');
const { createUserValidator } = require('../validators/users');

router.post('/register', createUserValidator, createUser);

router.post('/login', loginValidator, loginUser);

module.exports = router;
