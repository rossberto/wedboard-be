const express = require('express');
const db = require('../../db/database');

const userTodosRouter = express.Router();

// Middleware
const mw = require('../middleware');

// Local Middleware
function setDataRequirements(req, res, next) {
  console.log(req.body);

  req.minimumRequestData = [
    'title',
    'due_date',
    'type'
  ];

  req.expectedPostData = [
    'title',
    'notes',
    'start_date',
    'due_date',
    'type',
    'status',
    'action_url',
    'important',
    'ProjectServices_id'
  ];

  req.expectedUpdateData = [
    'title',
    'notes',
    'start_date',
    'due_date',
    'status',
    'action_url',
    'completed_date',
    'completed',
    'starred',
    'important'
  ];

  next();
}


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

/*
// POST /api/users/:userId/todos
userTodosRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  req.values[0].push(req.userId);
  const sql = 'INSERT INTO Todos (title, notes, start_date, due_date, type, ' +
              'status, action_url, important, ProjectServices_id, Users_id) ' +
              'VALUES ?';
  db.query(sql, [req.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      res.status(201).send({insertions: result.affectedRows})
    }
  });
});

//  /api/users/:userId/todos/:todoId
userTodosRouter.param('todoId', (req, res, next, todoId) => {
  const sql = `SELECT * FROM Todos WHERE id=${todoId}`;
  db.query(sql, function(err, todo) {
    if (err) {
      next(err);
    } else if (todo.length > 0) {
      req.todoId = todoId;
      req.todo = todo[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});

userTodosRouter.get('/:todoId', (req, res, next) => {
  res.status(200).send(req.todo);
});

userTodosRouter.put('/:todoId', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  const sql = 'UPDATE Todos SET ' +
              'title= ? , ' +
              'notes= ? , ' +
              'start_date= ? , ' +
              'due_date= ? , ' +
              'status= ? , ' +
              'action_url= ? , ' +
              'completed_date= ? , ' +
              'completed= ? , ' +
              'starred= ? , ' +
              'important= ? ' +
              `WHERE id=${req.todoId}`;
  db.query(sql, req.values[0], function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM Todos WHERE id=${req.todoId}`, function(err, todo) {
        if (err) {
          next(err);
        } else {
          res.status(200).send(todo[0]);
        }
      });
    }
  });
});

userTodosRouter.delete('/:todoId', (req, res, next) => {
  const sql = `UPDATE Todos SET deleted=1 WHERE id=${req.todoId}`;
  db.query(sql, function(err) {
    if (err) {
      next(err);
    } else {
      res.status(204).send();
    }
  });
});

*/
module.exports = userTodosRouter;
