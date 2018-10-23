const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
