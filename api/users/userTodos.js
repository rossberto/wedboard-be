/*
      GET /api/users/:userId/todos
*/
const express = require('express');
const db = require('../../db/database');

const userTodosRouter = express.Router();

// Middleware
const mw = require('../middleware');

/* User's Todos Routes */

// GET /api/users/:userId/todos
userTodosRouter.get('/', (req, res, next) => {
  const sql = `SELECT * FROM Todos WHERE Users_id=${req.userId}`;
  db.query(sql, function(err, todos) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(todos);
    }
  });
});

module.exports = userTodosRouter;
