const express = require('express');
const router = express.Router();

const Game = require('../models/game');
const utils = require('./utils')

// GET all games
router.get('/', (req, res, next) => {
  utils.queryHandler(Game.getAll, null, req, res, next);
});

// GET game by accessCode
router.get('/:code', (req, res, next) => {
  utils.queryHandler(Game.getGameByAccessCode, req.params.code, req, res, next);
});

// UPDATE game
router.put('/:id', (req, res, next) => {
  req.body.id = req.params.id;
  utils.queryHandler(Game.update, req.body, req, res, next);
});

// INSERT new game
router.post('/:code', (req, res, next) => {
  const newGame = {
    accessCode: req.params.code,
    status: 'waiting'
  };

  utils.queryHandler(Game.create, newGame, req, res, next);
});

module.exports = router;
