const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  prime: {
    member: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date
    },
    fee: {
      type: Number
    }
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

module.exports = User = mongoose.model('users', UserSchema);
