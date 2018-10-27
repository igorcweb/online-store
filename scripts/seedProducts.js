const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
mongoose.Promise = global.Promise;

// This file empties the products collection and inserts the books below
const db = process.env.MONGODB_URI;
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
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget2',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget3',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget4',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget5',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget6',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget7',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget8',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget9',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  },
  {
    name: 'widget10',
    category: 'widgets',
    description: 'a;lsdkfjas;ldfj',
    inStock: 20,
    price: 19.99
  }
];

Product.remove({})
  .then(() => Product.collection.insertMany(products))
  .then(data => {
    console.log(data.insertedIds.length + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
