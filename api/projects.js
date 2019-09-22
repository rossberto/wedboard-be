const express = require('express');
const projectsRouter = express.Router();

projectsRouter.get('/', (req, res, next) => {
  console.log('GET Projects fetched');
  res.status(200).send()
});

module.exports = projectsRouter;
