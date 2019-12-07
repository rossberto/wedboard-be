const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users/users');
const projectsRouter = require('./projects/projects');
const servicesRouter = require('./services/services');
const providersRouter = require('./providers/providers');
const surveysRouter = require('./surveys/surveys');
const authRouter = require('./auth/auth');

apiRouter.use('/users', usersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/services', servicesRouter);
apiRouter.use('/providers', providersRouter);
apiRouter.use('/surveys', surveysRouter);
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;
