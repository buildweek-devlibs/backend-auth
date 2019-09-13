exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('credentials').insert([
    {
      credential_id: 996,
      username: 'eric',
      password: 'password',
      permission_id: 3,
    },
    {
      credential_id: 997,
      username: 'ruben',
      password: 'password',
      permission_id: 3,
    },
    {
      credential_id: 998,
      username: 'moderator',
      password: 'password',
      permission_id: 2,
    },
    {
      credential_id: 999,
      username: 'user',
      password: 'password',
      permission_id: 1,
    },
  ]);
};
