const express = require('express');
const router = express.Router();

const Player = require('../models/player');
const utils = require('./utils')

// GET player by id
router.get('/:id', (req, res, next) => {
  utils.queryHandler(Player.getPlayerById, req.params.id, req, res, next);
});

// INSERT new game
router.post('/:gameId', (req, res, next) => {
  const newPlayer = {
    gameId: req.params.gameId,
    name: req.body.name,
    status: 'waiting'
  };

  Player.create(newPlayer)
  .then(id => { res.status(201).json(id[0]) })
  .catch(err => { next(err) })
});

module.exports = router;
