const jwt = require('jsonwebtoken');

const SECRET = process.env.TOKEN_SECRET;

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: '12h' });
  return token;
};

const validateToken = (req, res, next) => {
  const token = req.header('_token') || req.query._token;
  if (token) {
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) return res.status(401).json('unauthorize');
      req.user = payload;
      return next();
    });
  } else {
    res.status(401).json('no token provided: unauthorize');
  }
};

module.exports = {
  generateToken,
  validateToken
};
