const express = require("express");
const router = express.Router();

const { articleValidationRules } = require("../model/Article");
const { validate } = require("../middleware/validate")
const auth = require('../middleware/auth')

const ArticleController = require('../controllers/articleController')

router.post ( "/:articleId/like", auth, ArticleController.like )
router.post ( "/:articleId/dislike", auth, ArticleController.dislike )
router.get ( "/bookmarks", auth, ArticleController.getBookmarks )

router.post ( "/", auth, articleValidationRules(), validate,  ArticleController.create )
router.patch ( "/:id", auth, articleValidationRules(), validate, ArticleController.update )
router.get ( "/", auth, ArticleController.getList )
router.get ( "/my", auth, ArticleController.getMy )
router.get ( "/:id", auth, ArticleController.getOne )
router.delete ( "/:id", auth, ArticleController.remove )

router.post ( "/:articleId/bookmark", auth, ArticleController.bookmark )
router.post ( "/:articleId/unbookmark", auth, ArticleController.unbookmark )




module.exports = router;