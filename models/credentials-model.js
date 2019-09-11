const db = require('../data/dbConfig.js');
const tbl = 'credentials';

const cModel = (module.exports = {});

cModel.find = function(credential_id) {
  if (credential_id)
    return db(tbl)
      .where({ credential_id })
      .first();
  else return db(tbl);
};

cModel.insert = function(credential) {
  return db(tbl)
    .insert(credential)
    .then(([credential_id]) => this.find(credential_id));
};

cModel.remove = function(credential_id) {
  return db(tbl)
    .where({ credential_id })
    .first()
    .del();
};

cModel.update = function(credential_id, credential) {
  return db(tbl)
    .where({ credential_id })
    .first()
    .update(credential)
    .then(() => this.find(credential_id));
};
