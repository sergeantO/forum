const mongoose = require("mongoose");

const BookmarkSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Article',
    required: true
  },
});

module.exports = {
  Bookmark: mongoose.model("bookmark", BookmarkSchema)
}