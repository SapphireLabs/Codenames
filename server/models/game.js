const knex = require('../db/knex');

module.exports = {
  getGameByAccessCode
}

function getGameByAccessCode(code) {
  return knex('games').where('accessCode', code);
}
