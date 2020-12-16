const express = require("express");
const router = express.Router();

const { articleValidationRules } = require("../model/Article");
const { validate } = require("../middleware/validate")
const auth = require('../middleware/auth')

const ArticleController = require('../controllers/articleController')

router.post ( "/article", auth, articleValidationRules(), validate,  ArticleController.create )
router.patch ( "/article/:id", auth, articleValidationRules(), validate, ArticleController.update )
router.get ( "/article", auth, ArticleController.getList )
router.get ( "/article/:id", auth, ArticleController.getOne )
router.delete ( "/article/:id", auth, ArticleController.remove )

module.exports = router;