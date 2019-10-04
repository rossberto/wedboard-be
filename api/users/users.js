/***** Users Routes *****/
/*
    GET /api/users
    POST /api/users
    GET /api/users/:userId
    PUT /api/users/:userId
    DELETE /api/users/:userId
    GET /api/users/:userId/details
    POST /api/users/:userId/details
    PUT /api/users/:userId/details
*/
const express = require('express');
const db = require('../../db/database');

// User's Middleware
const mw = require('./middleware');

const usersRouter = express.Router();

/***** User Routes *****/

// GET /api/users
usersRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM Users';
  db.query(sql, function(err, users) {
    if (err) {
      next(err);
    } else {
      res.status(200).send({users: users});
    }
  });
});

// POST /api/users
usersRouter.post('/', mw.validateUser, mw.getUserValues, (req, res, next) => {
  let sql = 'INSERT INTO Users (name, last_name, last_name_2, email, ' +
            'type, join_date, birthdate, gender, phone, ' +
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
usersRouter.put('/:userId', mw.validateUser, mw.getUserValues, (req, res, next) => {
  const sql = 'UPDATE Users SET ' +
              'name= ? , ' +
              'last_name= ? , ' +
              'last_name_2= ? , ' +
              'email= ? , ' +
              'type= ? , ' +
              'join_date= ? , ' +
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
  const sql = 'UPDATE Users ' +
              'SET is_forbidden=1 ' +
              `WHERE id=${req.userId}`;
  db.query(sql, function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM Users WHERE id=${req.userId}`, function(err, user) {
        if (err) {
          next(err);
        } else {
          res.status(200).send({user: user[0]});
        }
      });
    }
  });
});

// GET /api/users/:userId/details
usersRouter.get('/:userId/details', (req, res, next) => {
  const type = req.user.type;
  const sql = `SELECT * FROM ${type}Users WHERE Users_id=${req.userId}`;
  db.query(sql, function(err, details) {
    if (err) {
      next(err);
    } else if (details[0]) {
      res.status(200).send({user: details[0]});
    } else {
      res.status(404).send();
    }
  });
});

// POST /api/users/:userId/details
usersRouter.post('/:userId/details', mw.validateUserDetails, mw.getUserDetails, mw.getSqlCommand, (req, res, next) => {
  db.query(req.sql, [req.details], function(err, result) {
    if (err) {
      next(err);
    } else {
      const type = req.user.type;
      const sql = `SELECT * FROM ${type}Users WHERE id= ? LIMIT 1`;
      db.query(sql, [result.insertId], function(err, insertedUserDetails) {
        if (err) {
          next(err);
        } else {
          res.status(201).send({userDetails: insertedUserDetails[0]});
        }
      });
    }
  });
});

// PUT /api/users/:userId/details
usersRouter.put('/:userId/details', mw.validateUserDetails, mw.getUserDetails, mw.getSqlCommand, (req, res, next) => {
  db.query(req.sql, req.details[0], function(err, result) {
    if (err) {
      next(err);
    } else {
      const type = req.user.type;
      const sql = `SELECT * FROM ${type}Users WHERE Users_id=${req.userId}  LIMIT 1`;
      db.query(sql, function(err, insertedUserDetails) {
        if (err) {
          next(err);
        } else {
          res.status(200).send({userDetails: insertedUserDetails[0]});
        }
      });
    }
  });
});

module.exports = usersRouter;
