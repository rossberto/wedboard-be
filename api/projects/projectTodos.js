/***** Project Users Routes *****/
/*
    GET /api/projects/:projectId/todos
    POST /api/projects/:projectId/todos
*/
const express = require('express');
const db = require('../../db/database');

const initialTodos = require('./initialTodos');

// project's Middleware
const mw = require('../middleware');

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const projectTodosRouter = express.Router();

/***** project Routes *****/
/*
// GET /api/projects/:projectId/users
projectTodosRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM (' +
                'SELECT Projects_id, name, last_name, last_name_2, email, type, phone, Users_id ' +
                'FROM ProjectUsers ' +
                'JOIN Users ON ProjectUsers.Users_id = Users.id ' +
                `) TablaDerivada WHERE TablaDerivada.Projects_id=${req.projectId}`;
  db.query(sql, function(err, users) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(users);
    }
  });
});
*/
// POST /api/projects/:projectId/todos/initial-todos
projectTodosRouter.post('/initial-todos', (req, res, next) => {
  const coupleId = req.body.data.coupleId;
  const today = new Date();

  const values = [
    [initialTodos[0].title, today, addDays(today, initialTodos[0].dueDaysOffset), `/apps/dashboards/project/${req.projectId}`, 'Initial', coupleId],
    [initialTodos[1].title, today, addDays(today, initialTodos[1].dueDaysOffset), `/apps/survey/${req.projectId}`, 'Initial', coupleId],
    [initialTodos[2].title, today, addDays(today, initialTodos[2].dueDaysOffset), `/apps/project/${req.projectId}/checklist`, 'Initial', coupleId],
    [initialTodos[3].title, today, addDays(today, initialTodos[3].dueDaysOffset), `/apps/dashboards/project/${req.projectId}`, 'Initial', coupleId],
  ];

  const sql = `INSERT INTO Todos (title, start_date, due_date, action_url, type, Users_id) VALUES ?`;
  db.query(sql, [values], function(err, result) {
    if (err) {
      next(err);
    } else {
      res.status(201).send();
    }
  });
});

projectTodosRouter.param('todoId', (req, res, next, todoId) => {
  const sql = `SELECT * FROM Todos WHERE id=${todoId}`;
  db.query(sql, function(err, todo) {
    console.log('en todo param');
    console.log(todo);
    if (err) {
      next(err);
    } else if (todo[0]) {
      req.todoId = todoId;
      req.todo = todo[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});

// POST /api/projects/:projectId/todos/:todoId/completed
projectTodosRouter.put('/:todoId/completed', (req, res, next) => {
  const today = new Date();  //req.body.completedDate;
  let sql = `UPDATE Todos SET completed=1, completed_date=? WHERE id=${req.todoId}`;
  db.query(sql, [today], function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = `SELECT * FROM Todos WHERE id=${req.todoId} LIMIT 1`;
      db.query(sql, function(err, todo) {
        if (err) {
          next(err);
        } else {
          console.log('deberia actualizarse todo');
          console.log(todo[0]);
          res.status(200).send(todo[0]);
        }
      });
    }
  });
});

module.exports = projectTodosRouter;
