const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    //Number of ratings
    number: {
      type: Number,
      default: 0
    },
    total: {
      //All ratings added together
      type: Number,
      default: 0
    }
  }
});

module.exports = Product = mongoose.model('products', ProductSchema);
