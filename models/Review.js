const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  },
  value: {
    type: String
  }
});

module.exports = Review = mongoose.model('reviews', ReviewSchema);
