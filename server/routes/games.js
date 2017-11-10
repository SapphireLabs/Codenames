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

    // Create new game
    const newGame = await Game.create({ accessCode, status: 'waiting' });

    res.status(201).json(newGame[0]);
  } catch (err) {
    next(err);
  }
});

// GET game by accessCode
router.get('/:code', async (req, res, next) => {
  try {
    const games = await Game.getGameByAccessCode(req.params.code);

    if (games.length) {
      res.status(200).json(games[0]);
    } else {
      res.status(400).send({ error: `Game does not exist with access code "${req.params.code}"` });
    }
  } catch (err) {
    next(err);
  }
});

// UPDATE game
router.put('/:id', (req, res, next) => {
  const game = { ...req.body, id: req.params.id };

  utils.queryHandler(Game.update, game, req, res, next);
});

module.exports = router;
