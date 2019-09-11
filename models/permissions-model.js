const db = require('../data/dbConfig.js');
const tbl = 'permissions';

const pModel = (module.exports = {});

pModel.find = function(permission_id) {
  if (permission_id)
    return db(tbl)
      .where({ permission_id })
      .first();
  else return db(tbl);
};

pModel.insert = function(permission) {
  return db(tbl)
    .insert(permission)
    .then(([permission_id]) => this.find(permission_id));
};

pModel.remove = function(permission_id) {
  return db(tbl)
    .where({ permission_id })
    .first()
    .del();
};

pModel.update = function(permission_id, permission) {
  return db(tbl)
    .where({ permission_id })
    .first()
    .update(permission)
    .then(() => this.find(permission_id));
};
