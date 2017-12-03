const express = require('express');
const router = express.Router();

const Word = require('../models/word');
const utils = require('./utils')

// GET words by gameId
router.get('/game/:gameId', (req, res, next) => {
  utils.queryHandler(Word.getWordsByGameId, req.params.gameId, req, res, next);
});

// SET words by gameId
router.post('/game/:gameId', (req, res, next) => {
  const wordList = utils.generateWordList();
  const positions = utils.generatePositions();
  const wordsAndPositions = wordList.map((word, i) => ({
    word,
    gameId: req.params.gameId,
    position: i,
    team: positions[i]
  }));
  const param = { wordsAndPositions };

  utils.queryHandler(Word.setWordsByGameId, param, req, res, next);
});

module.exports = router;
