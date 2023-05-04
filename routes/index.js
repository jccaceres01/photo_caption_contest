
const fs = require('fs');
// const path = require('path');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const files = fs.readdirSync(__dirname);
files.forEach(file => {
  const fileName = file.split('.')[0];
  const fileExtension = file.split('.')[1];

  if (fileName !== 'index') {
    router.use(`/api/${fileName}s`, require(`./${fileName}.${fileExtension}`));
  }
});

module.exports = router;
