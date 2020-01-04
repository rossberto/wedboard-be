/***** Users Routes *****/
/*
    GET /api/users
    POST /api/users
    GET /api/users/:userId
    PUT /api/users/:userId
    DELETE /api/users/:userId
*/
const express = require('express');
const db = require('../../db/database');
const sendInvitation = require('./invitation');

// User's Middleware
const mw = require('../middleware');

const usersRouter = express.Router();

// Local Middleware
function setDataRequirements(req, res, next) {
  console.log(req.params);

  req.minimumRequestData = [
    'name',
    'email',
    'type'
  ];

  req.expectedPostData = [
    'name',
    'last_name',
    'last_name_2',
    'email',
    'type',
    'birthdate',
    'gender',
    'phone',
    'token',
    'is_online',
    'is_forbidden'
  ];

  req.expectedUpdateData = [
    'name',
    'last_name',
    'last_name_2',
    'email',
    'type',
    'birthdate',
    'gender',
    'phone',
    'token',
    'is_online',
    'is_forbidden'
  ];

  next();
}

/***** User Routes *****/
// GET /api/users
usersRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM Users';
  db.query(sql, function(err, users) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(users);
    }
  });
});

// POST /api/users
usersRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  let sql = 'INSERT INTO Users (name, last_name, last_name_2, email, ' +
            'type, birthdate, gender, phone, ' +
            'token, is_online, is_forbidden) VALUES ?';
  db.query(sql, [req.values], function(err, result, fields) {
    if (err) {
      next(err);
    } else {
      sql = 'SELECT * FROM Users WHERE id= ? LIMIT 1';
      db.query(sql, [result.insertId], function(err, insertedUser) {
        if (err) {
          next(err);
        } else {
          sendInvitation(insertedUser[0].email, insertedUser[0].type);
          res.status(201).send({user: insertedUser[0]});
        }
      });
    }
  });
});

usersRouter.param('userId', (req, res, next, userId) => {
  const sql = `SELECT * FROM Users WHERE id=${userId}`;
  db.query(sql, function(err, user) {
    if (err) {
      next(err);
    } else if (user[0]) {
      req.userId = userId;
      req.user = user[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});

// GET /api/users/:userId
usersRouter.get('/:userId', (req, res, next) => {
  res.status(200).send({user: req.user});
});

// PUT /api/users/:userId
usersRouter.put('/:userId', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  const sql = 'UPDATE Users SET ' +
              'name= ? , ' +
              'last_name= ? , ' +
              'last_name_2= ? , ' +
              'email= ? , ' +
              'type= ? , ' +
              'birthdate= ? , ' +
              'gender= ? , ' +
              'phone= ? ' +
              `WHERE id=${req.userId}`;
  db.query(sql, req.values[0], function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM Users WHERE id=${req.userId}`, function(err, user) {
        if (err) {
          next(err);
        } else {
          res.send({user: user[0]});
        }
      });
    }
  });
});

// DELETE /api/users/:userId
usersRouter.delete('/:userId', (req, res, next) => {
  const sql = `DELETE FROM Users WHERE id=${req.userId}`;
  db.query(sql, function(err) {
    if (err) {
      next(err);
    } else {
      res.status(204).send();
    }
  });
});

const userDetailsRouter = require('./userDetails');
usersRouter.use('/:userId/details', userDetailsRouter);

const userTodosRouter = require('./userTodos');
usersRouter.use('/:userId/todos', userTodosRouter);

module.exports = usersRouter;
