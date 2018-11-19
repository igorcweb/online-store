const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
var path = require('path');
const router = express.Router();
const db = require('../../models/');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const moment = require('moment');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route GET api/users
// @access Public
router.get('/', (req, res) => {
  db.User.find({})
    .populate('orders')
    .exec((err, users) => {
      if (err) {
        throw err;
      } else {
        res.json(users);
      }
    });
});

// @route POST api/users/register
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Check if user exists
  db.User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User(req.body);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser.date = moment().format('MMMM Do, YYYY');
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login User / Returning JWT
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  db.User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
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
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc Return current user (only for testing with postman)
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    db.User.findById(req.user._id)
      .populate('orders')
      .exec()
      .then(user => res.json(user))
      .catch(err => res.json(err));
    // res.json(req.user);
  }
);

// @route GET api/users/:id
// @desc get current user data
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.User.findById(id)
    .populate('orders')
    .exec()
    .then(user => res.json(user))
    .catch(err => res.render({ err }));
});

// @route PUT api/users/address/:id
// @desc sign up for prime membership
router.put('/address/:id', (req, res) => {
  const id = req.params.id;
  const { street, city, state, zipcode } = req.body;
  db.User.findByIdAndUpdate(id, {
    $set: {
      'address.street': street,
      'address.city': city,
      'address.state': state,
      'address.zipcode': zipcode
    }
  })
    .then(() => res.json({ msg: 'success' }))
    .catch(err => res.json(err));
});

// @route PUT api/users/prime/:id
// @desc sign up for prime membership
router.put('/prime/:id', (req, res) => {
  const id = req.params.id;
  db.User.findByIdAndUpdate(id, {
    $set: {
      'prime.member': true,
      'prime.nextPayment': moment()
        .add(1, 'year')
        .format('MMMM Do, YYYY'),
      'prime.fee': 59.99
    }
  })
    .then(() => res.json({ msg: 'success' }))
    .catch(err => res.json({ err }));
});

// @route GET api/users/order/:id
// @desc place an order (make a purchase)
router.put('/order/:id', (req, res) => {
  const id = req.params.id;
  req.body.products.forEach(product => {
    const productId = product[0];
    const quantity = product[1];
    db.User.findByIdAndUpdate(id, {
      $push: { orders: productId }
    })
      .populate('orders')
      .then(() => res.json({ msg: 'success' }))
      .finally(() => {
        // Update inStock value
        db.Product.findByIdAndUpdate(productId, {
          $inc: { inStock: -1 * quantity }
        }).then(() => {
          console.log('inStock property updated');
        });
      })
      .catch(err => res.json({ msg: err }));
  });
});

// @route POST api/users/rating/:id
// @desc rate a product
router.post('/rating/:id', (req, res) => {
  const userId = req.params.id;
  const productId = '5bdc854ab8e66315f3d7382e';
  const value = 4;
  db.Rating.create({ user: userId, product: productId, value })
    .then(result => res.json(result))
    .catch(err => res.json({ err }));
});

// @route get api/users/rating/:id
// @desc get user rating data
router.get('/rating/:id', (req, res) => {
  const userId = req.params.id;
  db.Rating.find({ user: userId })
    .populate('product')
    .exec()
    .then(result => res.json(result))
    .catch(err => res.json({ err }));
});

// @route get api/users/product-rating/:id
// @desc get product rating data

router.get('/product-rating/:id', (req, res) => {
  const productId = req.params.id;
  db.Rating.find({ product: productId })
    .populate('product')
    .exec()
    .then(result => res.json(result))
    .catch(err => res.json({ err }));
});

module.exports = router;
