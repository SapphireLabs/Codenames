const knex = require('../db/knex');

module.exports = {
  getWordsByGameId,
  setWordsByGameId
}

function getWordsByGameId(gameId) {
  return knex('words').where('gameId', gameId);
}

function setWordsByGameId(words) {
  return knex('words').insert(words.wordsAndPositions).returning('*');
}
