const express = require('express');
const router = express.Router();

const Player = require('../models/player');
const utils = require('./utils')

// GET all players
router.get('/', (req, res, next) => {
  res.send('send all players back');
});

// GET player by id
router.get('/:id', (req, res, next) => {
  utils.queryHandler(Player.getPlayerById, req.params.id, req, res, next);
});

module.exports = router;
