const knex = require('../db/knex');

module.exports = {
  getAll,
  getGameById,
  create
}

function getAll() {
  return knex('games');
}

function getGameById(id) {
  return knex('games').where('id', id);
}

function create(game) {
  return knex('games').insert(game).returning('*');
}
