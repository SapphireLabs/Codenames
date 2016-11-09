const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

var knex = require('knex')(config);

if (environment === 'development') {
  knex.migrate.rollback()
  .then(() => {
    knex.migrate.latest();
  });
}

module.exports = knex;
