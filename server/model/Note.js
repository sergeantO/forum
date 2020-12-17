const mongoose = require("mongoose");
const { body } = require('express-validator')

const NoteSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  hash: {
    type: String,
  },
  comment: {
    type: String
  },
  time: {
    type: Date,
    required: true,
    default: new Date()
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Article',
    required: true
  },
  _save: {
    type: Boolean,
    required: true
  }, 
  publish: {
    type: Boolean,
    required: true
  }
});

const noteValidationRules = () => {
  return [
    body('articleId', "Please enter a valid article").not().isEmpty().isString(),
    body('text', "Please enter a valid tags").not().isEmpty().isString(),
    body('save', "Please enter a valid save").not().isEmpty().isBoolean(),
    body('publish', "Please enter a valid publish").not().isEmpty().isBoolean(),
    
    body('hash', "Please enter a valid hash").isString(),
    body('comment', "Please enter a valid comment").isString()
  ]
}


module.exports = {
  noteValidationRules,
  Note: mongoose.model("note", NoteSchema)
}