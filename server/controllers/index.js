const express = require('express');
const router = express.Router();

router.use('/players', require('./players'));
router.use('/games', require('./games'));
router.use('/words', require('./words'));
router.use('/messages', require('./messages'));

module.exports = router;
