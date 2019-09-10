const db = require('../data/dbConfig.js');

const sessionModel = (module.exports = {});

sessionModel.find = function(id) {
  if (id)
    return db('sessions')
      .where('session_id', id)
      .first();
  else return db('sessions');
};

sessionModel.findBy = function(filter) {
  return db('sessions').where(filter);
};

sessionModel.insert = async function(session) {
  const [id] = await db('session').insert(session, 'session_id');
  return sessionModel.find(id);
};

sessionModel.remove = async function(id) {
  const deletedSession = await sessionModel.find(id);
  const deleted = await db('sessions')
    .where('session_id', id)
    .first()
    .del();

  if (deleted) return deletedSession;
};
