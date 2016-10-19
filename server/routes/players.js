const express = require('express');
const router = express.Router();

// GET all players
router.get('/', (req, res, next) => {
  res.send('send all players back');
});

module.exports = router;

