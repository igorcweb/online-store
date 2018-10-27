const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// @route GET api/products
// @access Public
router.get('/', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      throw err;
    } else {
      res.json(products);
    }
  });
});

module.exports = router;
