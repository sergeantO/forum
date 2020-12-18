const express = require("express");
const router = express.Router();
const path = require('path');
const upload = require('../middleware/uploadMiddleware');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!" + err.message);
};


router.post('/', 
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const newName = `images/${uuidv4()}.png`
    const targetPath = path.join(__dirname, '../' + newName);
    
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);

      res.status(200).json({ filename: 'http://localhost:4000/' + newName })
    });
  } 
);

module.exports = router;