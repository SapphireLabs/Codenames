const express = require('express');
const router = express.Router();

const Game = require('../models/game');
const utils = require('./utils')
const gameUtils = require('../utils/game')

// GET all games
router.get('/', (req, res, next) => {
  utils.queryHandler(Game.getAll, null, req, res, next);
});

/**
 * POST new game
 */
router.post('/', async (req, res, next) => {
  try {
    // Get list of current access codes
    const games = await Game.getAll();
    const accessCodesInUse = new Set(games.map(game => game.accessCode));
    let accessCode = gameUtils.generateAccessCode();

    // Find new access code
    while (accessCodesInUse.has(accessCode)) {
      accessCode = gameUtils.generateAccessCode();
    }

    const newGame = { accessCode, status: 'waiting' };

    // Create new game
    utils.queryHandler(Game.create, newGame, req, res, next);
  } catch (err) {
    next(err);
  }
});

// GET game by accessCode
router.get('/:code', (req, res, next) => {
  utils.queryHandler(Game.getGameByAccessCode, req.params.code, req, res, next);
});

// UPDATE game
router.put('/:id', (req, res, next) => {
  const game = { ...req.body, id: req.params.id };

  utils.queryHandler(Game.update, game, req, res, next);
});

module.exports = router;
