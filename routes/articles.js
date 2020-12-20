const express = require("express");
const router = express.Router();

const { articleValidationRules } = require("../model/Article");
const { validate } = require("../middleware/validate")
const auth = require('../middleware/auth')

const ArticleController = require('../controllers/articleController')

router.post ( "/", auth, articleValidationRules(), validate,  ArticleController.create )
router.patch ( "/:id", auth, articleValidationRules(), validate, ArticleController.update )
router.get ( "/", auth, ArticleController.getList )
router.get ( "/my", auth, ArticleController.getMy )
router.get ( "/:id", auth, ArticleController.getOne )
router.delete ( "/:id", auth, ArticleController.remove )

module.exports = router;