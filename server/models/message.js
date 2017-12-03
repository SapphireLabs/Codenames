const knex = require('../db/knex');

module.exports = {
  getByGameId,
  create,
}

function getByGameId(gameId) {
  return knex('messages').where('gameId', gameId);
}

function create(message) {
  return knex('messages').insert(message).returning('*');
}

