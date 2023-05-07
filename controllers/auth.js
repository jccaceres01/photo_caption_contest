const { matchedData } = require('express-validator');
const { User } = require('../models');
const { comparePassword } = require('../utils/handlePassword');
const { generateToken } = require('../utils/handleToken');

const loginUser = async (req, res) => {
  req = matchedData(req);
  const { email, password } = req;
  const user = await User.findOne({ where: { email } });
  if (user) {
    const validPassword = await comparePassword(password, user.password);
    if (validPassword) {
      const userData = { id: user.id, name: user.name, email: user.email };
      const token = generateToken(userData);
      const data = {
        token,
        user: userData
      };
      return res.json(data);
    } else {
      return res.status(401).json('Unauthorized, password missmatch');
    }
  } else {
    return res.status(404).json('User not found');
  }
};

module.exports = { loginUser };
