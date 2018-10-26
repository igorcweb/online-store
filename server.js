const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const account = require('./routes/api/account');
const products = require('./routes/api/products');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5000;

//Native express body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Config
const db = process.env.MONGO_URI || 'mongodb://localhost/online-store';

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/account', account);
app.use('/api/products', products);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
