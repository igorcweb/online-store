const express = require('express');
const router = express.Router();

// @route GET api/account/test
// @access Public
router.get('/test', (req, res) => res.json({ message: 'account route works' }));

module.exports = router;
