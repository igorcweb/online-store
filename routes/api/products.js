const express = require('express');
const router = express.Router();
const db = require('../../models/');

// @route GET api/products/
// @access Public
router.get('/', (req, res) => {
  db.Product.find({}, (err, products) => {
    if (err) {
      throw err;
    } else {
      res.json(products);
    }
  });
});
// @route GET api/products/:category
// @access Public
router.get('/:category', (req, res) => {
  let category = req.params.category;
  category = category.charAt(0).toUpperCase() + category.slice(1);
  db.Product.find({ category }, (err, products) => {
    if (err) {
      throw err;
    } else {
      res.json(products);
    }
  });
});

// @route GET api/products/:query
// @access Public

router.get('/search/:query', (req, res) => {
  const query = req.params.query;
  db.Product.find({})
    .then(products => {
      const results = [];
      products.forEach(product => {
        if (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
        ) {
          results.push(product);
        }
      });
      res.json(results);
    })
    .catch(err => res.json({ err }));
});

// @route GET api/products/:id
// @access Public
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.Product.findById(id)
    .populate('ratings')
    .exec()
    .then(product => res.json(product))
    .catch(err => res.render({ err }));
});

// @route Put api/products/rating/:id
// @desc rate a product
router.put('/rating/:id', (req, res) => {
  const id = req.params.id;
  const rating = req.body.rating;
  db.Product.findById(id).then(response => {
    const total = response.rating.total;
    db.Product.findByIdAndUpdate(id, {
      $inc: { 'rating.number': 1 },
      $set: {
        'rating.total': parseInt(total) + parseInt(rating)
      }
    })
      .then(() => res.json({ msg: 'success' }))
      .catch(err => res.json(err));
  });
});

module.exports = router;
