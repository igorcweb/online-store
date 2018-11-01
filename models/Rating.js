const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  },
  value: {
    type: Number
  }
});

module.exports = Rating = mongoose.model('ratings', RatingSchema);
