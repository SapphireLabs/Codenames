const knex = require('../db/knex');

module.exports = {
  create,
  getPlayerById,
  getPlayersByGameId
}

function create(player) {
  return knex('players').insert(player).returning('*');
}

function getPlayerById(id) {
  return knex('players').where('id', id);
}

function getPlayersByGameId(gameId) {
  return knex('players').where('gameId', gameId);
}
