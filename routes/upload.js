const express = require("express");
const router = express.Router();
const path = require('path');
const upload = require('../middleware/uploadMiddleware');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const send = require("../controllers/resporseController");
const auth = require("../middleware/auth");
const config = require("config")


router.post('/', 
  auth,
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const newName = `images/${uuidv4()}.png`
    const targetPath = path.join(__dirname, '..', newName);
    
    fs.rename(tempPath, targetPath, err => {
      if (err) return send(res).ServerError("Oops! Something went wrong!", err.message)

      res.status(200).json({ filename: config.get('baseUrl') +'/'+ newName })
    });
  } 
);

module.exports = router;