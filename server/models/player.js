const knex = require('../db/knex');

module.exports = {
  create,
  update,
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

function update(player) {
  const id = player.id;
  delete(player[id]);

  return knex('players').where('id', id).update(player).returning('*');
}
