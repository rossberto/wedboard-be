const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users/users');
const projectsRouter = require('./projects/projects');
const servicesRouter = require('./services/services');
//const providersRouter = require('./providers/providers');

apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/services', servicesRouter);
//apiRouter.use('/providers', providersRouter);

module.exports = apiRouter;
