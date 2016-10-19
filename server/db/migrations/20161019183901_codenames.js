exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table) {
      table.increments('id').primary();
      table.string('accessCode');
      table.string('status');
      table.timestamps();
    }),
    knex.schema.createTable('players', function(table) {
      table.increments('id').primary();
      table.integer('gameId').references('id').inTable('games');
      table.string('name');
      table.string('status');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('codenames'); 
};
