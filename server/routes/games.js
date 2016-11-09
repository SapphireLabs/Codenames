const express = require('express');
const router = express.Router();

const Game = require('../models/game');
const utils = require('./utils')

// GET game by accessCode
router.get('/:code', (req, res, next) => {
  utils.queryHandler(Game.getGameByAccessCode, req.params.code, req, res, next);
});

module.exports = router;
