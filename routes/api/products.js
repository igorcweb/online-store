const express = require('express');
const router = express.Router();

// @route GET api/products/test
// @access Public
router.get('/test', (req, res) =>
  res.json({ message: 'products route works' })
);

module.exports = router;
