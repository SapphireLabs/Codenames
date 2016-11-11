const knex = require('../db/knex');

module.exports = {
  getAll,
  getGameByAccessCode,
  create
}

function getAll() {
  return knex('games');
}

function getGameByAccessCode(code) {
  return knex('games').where('accessCode', code);
}

function create(game) {
  return knex('games').insert(game).returning('*');
}
