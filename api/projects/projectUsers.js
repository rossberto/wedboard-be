/***** Project Users Routes *****/
/*
    GET /api/projects/:projectId/users
    POST /api/projects/:projectId/users
*/
const express = require('express');
const db = require('../../db/database');

// project's Middleware
const mw = require('../middleware');

const projectUsersRouter = express.Router();

/***** project Routes *****/

// GET /api/projects/:projectId/users
projectUsersRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM (' +
                'SELECT Projects_id, name, last_name, last_name_2, email, type, phone, Users_id ' +
                'FROM ProjectUsers ' +
                'JOIN Users ON ProjectUsers.Users_id = Users.id ' +
                `) TablaDerivada WHERE TablaDerivada.Projects_id=${req.projectId}`;
  db.query(sql, function(err, services) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(services);
    }
  });
});

// POST /api/projects/:projectId/users
projectUsersRouter.post('/', (req, res, next) => {
  const sql = `INSERT INTO ProjectUsers (Projects_id, Users_id) VALUES ?`;
  db.query(sql, [req.body.data.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      console.log('Number of inserted records: ' + result.affectedRows);
      res.status(201).send();
    }
  });
});

module.exports = projectUsersRouter;
