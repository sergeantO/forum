const mongoose = require("mongoose");
const { body } = require('express-validator')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  image: {
    type: String,
  },
  inviter: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  skills: {
    type: Map,
    of: Number,
    default: { 'mentoring': 0, 'moderation': 0 }
  }
});

const userRegistrationValidationRules = () => {
  return [
    body('invite', "User must have invite").not().isEmpty(),
    body('username', "Please enter a valid username").not().isEmpty(),
    body('password', "Please enter a valid password").isLength({ min: 6 }),
    body('email', "Please enter a valid email").isEmail()
  ]
}

const userLoginValidationRules = () => {
  return [
    body('email', "Please enter a valid email").isEmail(),
    body('password', "Please enter a valid password").isLength({ min: 6 }),
  ]
}

module.exports = {
  userRegistrationValidationRules,
  userLoginValidationRules,
  User: mongoose.model("user", UserSchema)
}