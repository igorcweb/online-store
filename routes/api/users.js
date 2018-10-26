const express = require('express');
const router = express.Router();

// @route GET api/users/test
// @access Public
router.get('/test', (req, res) => res.json({ message: 'users route works' }));

module.exports = router;
