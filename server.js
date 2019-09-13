const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const authRouter = require('./routers/auth-router.js');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/', authRouter);

server.get('/', (req, res) => {
  res.send(`
    <h1>Looking for API Information?</h1>
    <p>Please see the <a href='https://github.com/buildweek-devlibs/backend-auth'>README</a> for more information on where to go!</p>
  `);
});

module.exports = server;
