const express = require("express");
const router = express.Router();

const { noteValidationRules } = require("../model/Note");
const { validate } = require("../middleware/validate")
const auth = require('../middleware/auth')

const noteController = require('../controllers/noteController')

router.post( "/", auth, noteValidationRules(), validate,  noteController.create )
router.get ( "/my", auth, noteController.getByUserId )
router.get ( "/:artilceId", auth, noteController.getByArticleId )

module.exports = router;