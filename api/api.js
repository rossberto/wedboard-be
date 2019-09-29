const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users/users');
const projectsRouter = require('./projects/projects');
const providersRouter = require('./providers');

apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);

module.exports = apiRouter;
