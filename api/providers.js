const express = require('express');

const db = require('../db/database');

const providersRouter = express.Router();

providersRouter.get('/', (req, res, next) => {
  console.log('GET Providers fetched');
  res.status(200).send()
});

module.exports = providersRouter;
