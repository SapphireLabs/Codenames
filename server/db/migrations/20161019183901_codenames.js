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
    }),
    knex.schema.createTable('words', function(table) {
      table.increments('id').primary();
      table.integer('gameId').references('id').inTable('games');
      table.string('word');
      table.integer('position');
      table.string('team');
      table.boolean('revealed').defaultTo(false);
      table.timestamps();
    }),
    knex.schema.createTable('votes', function(table) {
      table.increments('id').primary();
      table.integer('wordId').references('id').inTable('words');
      table.integer('playerId').references('id').inTable('players');
      table.timestamps();
    }),
    knex.schema.createTable('messages', function(table) {
      table.increments('id').primary();
      table.integer('gameId').references('id').inTable('games');
      table.integer('playerId').references('id').inTable('players');
      table.string('message');
      table.boolean('isSpymaster').defaultTo(false);
      table.timestamps();
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('votes'),
    knex.schema.dropTableIfExists('words'),
    knex.schema.dropTableIfExists('messages'),
    knex.schema.dropTableIfExists('players'),
    knex.schema.dropTableIfExists('games')
  ]);
};
