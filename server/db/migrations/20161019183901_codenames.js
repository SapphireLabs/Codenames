exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('games', function(table) {
      table.increments('id').primary();
      table.string('accessCode');
      table.string('status');
      table.string('socketId');
      table.timestamps();
    }),
    knex.schema.createTable('players', function(table) {
      table.increments('id').primary();
      table.integer('gameId').references('id').inTable('games');
      table.string('name');
      table.string('status');
      table.boolean('host');
      table.string('team');
      table.string('role');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('players'),
    knex.schema.dropTableIfExists('games')
  ]);
};
