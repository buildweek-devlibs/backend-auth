const db = require('../data/dbConfig.js');
const tbl = 'sessions';

const sModel = (module.exports = {});

sModel.find = function(session_id) {
  if (session_id)
    return db(tbl)
      .where({ session_id })
      .first();
  else return db(tbl);
};

sModel.insert = function(session) {
  return db(tbl)
    .insert(session)
    .then(([session_id]) => this.find(session_id));
};

sModel.remove = function(session_id) {
  return db(tbl)
    .where({ session_id })
    .first()
    .del();
};

sModel.update = function(session_id, session) {
  return db(tbl)
    .where({ session_id })
    .first()
    .update(session)
    .then(() => this.find(session_id));
};
