const mongoose = require("mongoose");
const { body } = require('express-validator')

const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  blocks: {
    type: Array,
    required: true
  },
  ratings: {
    type: Map,
    of: Number,
  },
  time: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  image: {
    type: String,
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  publish: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create a virtual property `tags` with a getter and setter.
ArticleSchema.virtual('tags').
  get(function () {
    return Array.from( this.ratings.keys() ) 
  }).
  set(function (tags) {
    let ratings = tags.reduce((map, tag) => {
      map[tag] = 0;
      return map;
    }, {})

    this.ratings = ratings
  });

const articleValidationRules = () => {
  return [
    body('title', "Please enter a valid title").not().isEmpty().isString().isLength({ min: 3 }),
    body('blocks', "Please enter a valid blocks").not().isEmpty().isArray(),
    body('tags', "Please enter a valid tags").not().isEmpty().isArray(),
    body('time', "Please enter a valid time").isNumeric(),
    body('version', "Please enter a valid version").isString()
  ]
}


module.exports = {
  articleValidationRules,
  Article: mongoose.model("article", ArticleSchema)
}