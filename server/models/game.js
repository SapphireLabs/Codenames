const knex = require('../db/knex');

module.exports = {
  getAll,
  getGameByAccessCode,
  create,
  update
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

function update(game) {
  const id = game.id;
  delete(game[id]);

  return knex('games').where('id', id).update(game).returning('*');
}
