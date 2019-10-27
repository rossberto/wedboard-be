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

// Local middleware
function setDataRequirements(req, res, next) {
  console.log(req.params);
  req.minimumRequestData = [
    'Projects_id',
    'Users_id'
  ];

  req.expectedPostData = [
    'Projects_id',
    'Users_id'
  ];

  req.expectedUpdateData = [
    'Projects_id',
    'Users_id'
  ];

  next();
}

/***** project Routes *****/

// GET /api/projects/:projectId/users
projectUsersRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM (' +
	               'SELECT Projects_id, Users_id, ' +
                 'FROM ProjectUsers JOIN Users ' +
                 'ON ProjectUsers.Users_id = Users.id ' +
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
  //req.values[0].push(req.projectId);
  console.log(req.body.data.values);

  let sql = `INSERT INTO ProjectUsers (Projects_id, Users_id) VALUES (${req.projectId}, ?)`;
  db.query(sql, [req.body.data.values], function(err, result) {
    console.log(sql);
    if (err) {
      next(err);
    } else {
      sql = 'SELECT * FROM ProjectServices WHERE id= ? LIMIT 1';
      db.query(sql, [result.insertId], function(err, insertedService) {
        if (err) {
          next(err);
        } else {
          res.status(201).send({project: insertedService[0]});
        }
      });
    }
  });
});

module.exports = projectUsersRouter;
