const knex = require('knex');
const knexConfig = require('../knexfile.js');
const DB_ENV = require('../config/secrets.js').DB_ENV;

switch (DB_ENV) {
  case 'testing':
    module.exports = knex(knexConfig.testing);
    break;
  default:
    module.exports = knex(knexConfig.development);
}
