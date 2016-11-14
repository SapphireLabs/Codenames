const express = require('express');
const router = express.Router();

const Player = require('../models/player');
const utils = require('./utils')

// GET player by id
router.get('/:id', (req, res, next) => {
  utils.queryHandler(Player.getPlayerById, req.params.id, req, res, next);
});

// GET list of players by gameId
router.get('/game/:gameId', (req, res, next) => {
  utils.queryHandler(Player.getPlayersByGameId, req.params.gameId, req, res, next);
});

// GET list of players by gameId
router.get('/game/:gameId', (req, res, next) => {
  utils.queryHandler(Player.getPlayersByGameId, req.params.gameId, req, res, next);
});

// UPDATE player
router.put('/:id', (req, res, next) => {
  utils.queryHandler(Player.update, req.body, req, res, next);
});

// INSERT new player
router.post('/:gameId', (req, res, next) => {
  const newPlayer = {
    gameId: req.params.gameId,
    name: req.body.name,
    status: 'waiting'
  };

  utils.queryHandler(Player.create, newPlayer, req, res, next);
});

module.exports = router;
