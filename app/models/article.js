const mongoose = require('mongoose');
const Strings = require('../../config/strings');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: Object.values(Strings.articleCategory),
    required: true
  },
  gameCategory: [{
    type: String,
    enum: Object.values(Strings.gameCategory),
  }],
  author: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  content: {
    type: String,
  }
});

let Article = mongoose.model('Article', ArticleSchema);

module.exports = { Article }