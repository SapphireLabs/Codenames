const express = require('express');
const router = express.Router();

router.use('/players', require('./players'));
router.use('/games', require('./games'));

module.exports = router;
