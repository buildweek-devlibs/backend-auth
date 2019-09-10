exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('permissions').insert([
    {
      permission_id: 1,
      name: 'user',
    },
    {
      permission_id: 2,
      name: 'moderator',
    },
    {
      permission_id: 3,
      name: 'administrator',
    },
  ]);
};
