const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');

const IMAGES_STORAGE_PATH = path.join(__dirname, '../storage/images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGES_STORAGE_PATH);
  },
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split('.')[1];
    const newName = uuid();
    cb(null, `${newName}.${fileExt}`);
  }
});

const upload = multer({ storage });

module.exports = { upload };
