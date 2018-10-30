const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
mongoose.Promise = global.Promise;

// This file empties the products collection and inserts the products below
const db = process.env.MONGODB_URI || 'mongodb://localhost/online-store';
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const products = [
  {
    name: 'widget1',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget2',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget3',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget4',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget5',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget6',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget7',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget8',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget9',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget10',
    brand: 'adsfasdf',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    imgUrl: 'https://via.placeholder.com/200',
    inStock: 20,
    price: 19.99
  }
];

Product.remove({})
  .then(() => Product.collection.insertMany(products))
  .then(data => {
    console.log(data.insertedCount + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
