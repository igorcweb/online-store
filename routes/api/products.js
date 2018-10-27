const express = require('express');
const router = express.Router();
const db = require('../../models/');

// @route GET api/products
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

module.exports = router;
