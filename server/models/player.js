const knex = require('../db/knex');

module.exports = {
  create,
  getPlayerById
}

function create(player) {
  return knex('players').insert(player).returning('*');
}

function getPlayerById(id) {
  return knex('players').where('id', id);
}
