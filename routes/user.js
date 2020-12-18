const express = require("express");
const router = express.Router();

const { userLoginValidationRules, userRegistrationValidationRules } = require("../model/User");
const { validate } = require("../middleware/validate")
const UsersController = require('../controllers/userController')
const auth = require('../middleware/auth')


router.post( "/signup", userRegistrationValidationRules(), validate, UsersController.signup );
router.post( "/login", userLoginValidationRules(), validate, UsersController.login )
router.get ( "/me", auth, UsersController.me );

router.get ( "/newInvite", auth, UsersController.newInvite )

module.exports = router;
