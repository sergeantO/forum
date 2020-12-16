const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: path.join(__dirname, "../tmp/"),
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

module.exports = upload