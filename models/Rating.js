const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  },
  value: {
    type: Number,
    required: true
  }
});

module.exports = Rating = mongoose.model('ratings', RatingSchema);
