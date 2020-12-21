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
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const newName = `images/${uuidv4()}.png`
    const targetPath = path.join(__dirname, '..', newName);
    
    fs.rename(tempPath, targetPath, err => {
      if (err) return send(res).ServerError("Oops! Something went wrong!", err.message)

      const json = {
        "success" : 1,
        "file": {
            "url" : config.get('baseUrl') +'/'+ newName,
            // ... and any additional fields you want to store, such as width, height, color, extension, etc
      }
    }

      res.status(200).json(json)
    });
  } 
);

module.exports = router;