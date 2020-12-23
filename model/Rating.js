const mongoose = require("mongoose");
// const { body } = require('express-validator')

const RatingSchema = mongoose.Schema({
  isLike: {
    type: Boolean,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  userSkills: {
    type: Map,
    of: Number,
    required: true
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Article',
    required: true
  },
});

// const ratingValidationRules = () => {
//   return [
//     body('isLike', "Please enter a valid isLike").not().isEmpty().isBoolean(),
//   ]
// }


module.exports = {
  // ratingValidationRules,
  Rating: mongoose.model("rating", RatingSchema)
}