exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('permissions').insert([
    {
      user_id: 996,
      username: 'ericsl',
      password: 'password',
      permission_id: 3,
    },
    {
      user_id: 997,
      username: 'rubenr',
      password: 'password',
      permission_id: 3,
    },
    {
      user_id: 998,
      username: 'moderator',
      password: 'password',
      permission_id: 2,
    },
    {
      user_id: 999,
      username: 'user',
      password: 'password',
      permission_id: 1,
    },
  ]);
};
