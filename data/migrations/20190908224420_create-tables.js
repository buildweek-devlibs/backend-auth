exports.up = function(knex) {
  return knex.schema
    .createTable('sessions', (s) => {
      s.increments('session_id');
      s.text('token');
      s.boolean('isValid').defaultTo(false);
    })
    .createTable('permissions', (p) => {
      p.increments('permission_id');
      p.string('name', 255);
    })
    .createTable('credentials', (c) => {
      c.increments('user_id');
      c.string('username', 255).notNullable();
      c.string('password', 255).notNullable();
      c.integer('permission_id')
        .unsigned()
        .defaultTo(1)
        .references('permission_id')
        .inTable('permissions');
    });
};

exports.down = function(knex) {};
