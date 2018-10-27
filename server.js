const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const users = require('./routes/api/users');
const products = require('./routes/api/products');

const app = express();
const PORT = process.env.PORT || 5000;

//Native express body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('client/public'));

// DB Config
const db = process.env.MONGODB_URI || 'mongodb://localhost/online-store';

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/products', products);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
