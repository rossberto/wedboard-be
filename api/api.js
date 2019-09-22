const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users');
const providersRouter = require('./providers');
const projectsRouter = require('./projects');

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
