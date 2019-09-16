exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('credentials').insert([
    {
      credential_id: 996,
      username: 'eric',
      password: 'password',
      permission_id: 3,
      user_id: 996,
    },
    {
      credential_id: 997,
      username: 'ruben',
      password: 'password',
      permission_id: 3,
      user_id: 997,
    },
    {
      credential_id: 998,
      username: 'moderator',
      password: 'password',
      permission_id: 2,
      user_id: 998,
    },
    {
      credential_id: 999,
      username: 'user',
      password: 'password',
      permission_id: 1,
      user_id: 999,
    },
  ]);
};
