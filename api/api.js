const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users/users');
const providersRouter = require('./providers');
const projectsRouter = require('./projects');

apiRouter.use('/users', usersRouter);
//apiRouter.use('/providers', providersRouter);

module.exports = apiRouter;
