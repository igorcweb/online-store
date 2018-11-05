const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  prime: {
    member: {
      type: Boolean,
      default: false
    },
    nextPayment: {
      type: String
    },
    fee: {
      type: Number
    }
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'products'
    }
  ]
});

module.exports = User = mongoose.model('users', UserSchema);
