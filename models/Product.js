const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  brand: String,
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  inStock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number
  },
  productReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'reviews'
    }
  ]
});

module.exports = Product = mongoose.model('products', ProductSchema);
