const express = require('express');
const router = express.Router();

const Message = require('../models/message');
const utils = require('./utils');

// GET all messages for a particular game
router.get('/game/:gameId', (req, res, next) => {
  const gameId = req.params.gameId;

  utils.queryHandler(Message.getByGameId, gameId, req, res, next);
});


// POST new message
router.post('/game/:gameId', async (req, res, next) => {
  const gameId = req.params.gameId;

  const message = {
    message: req.body.message,
    gameId: req.body.gameId,
    playerId: req.body.playerId,
    isSpymaster: req.body.isSpymaster
  };

  utils.queryHandler(Message.create, message, req, res, next);
});

module.exports = router;
