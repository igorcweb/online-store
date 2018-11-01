const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  content: {
    type: String
  }
});

module.exports = Review = mongoose.model('reviews', ReviewSchema);
