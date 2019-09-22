const express = require('express');
const providersRouter = express.Router();

providersRouter.get('/', (req, res, next) => {
  console.log('GET Providers fetched');
  res.status(200).send()
});

module.exports = providersRouter;
