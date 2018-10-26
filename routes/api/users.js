const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route GET api/users/test
// @access Public
router.get('/test', (req, res) => res.json({ message: 'users route works' }));

// @route GET api/users/register
// @access Public
router.post('/register', (req, res) => {
  //Check if user exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User(req.body);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login User / Returning JWT
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched
        const payload = { id: user._id, name: user.name };

        //Sign Token
        jwt.sign(
          payload,
          process.env.SECRET_OR_KEY,
          { expiresIn: 7200 },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;
