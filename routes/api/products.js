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

// @route GET api/products/:id
// @access Public
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.Product.findById(id)
    .populate('productReviews')
    .exec()
    .then(product => res.json(product))
    .catch(err => res.render({ err }));
});

module.exports = router;
