/***** Projects Routes *****/
/*
    GET /api/projects
    POST /api/projects
    GET /api/projects/:projectId
    PUT /api/projects/:projectId
*/
const express = require('express');
const db = require('../../db/database');

// project's Middleware
const mw = require('./middleware');

const projectsRouter = express.Router();

/***** project Routes *****/

// GET /api/projects
projectsRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM Projects';
  db.query(sql, function(err, projects) {
    if (err) {
      next(err);
    } else {
      res.status(200).send({projects: projects});
    }
  });
});

// POST /api/projects
projectsRouter.post('/', mw.validateProject, mw.getProjectValues, (req, res, next) => {
  let sql = 'INSERT INTO Projects (creation_timestamp, name, feast_date, created_by, ' +
            ' feast_location, civil_ceremony_date, civil_ceremony_location, ' +
            'religious_ceremony_date, religious_location, custom_ceremony_description, ' +
            'custom_ceremony_description_2, custom_ceremony_date, custom_ceremony_location, ' +
            'guests_quantity, pinterest_board_url) VALUES ?';
  db.query(sql, [req.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = 'SELECT * FROM Projects WHERE id= ? LIMIT 1';
      db.query(sql, [result.insertId], function(err, insertedproject) {
        if (err) {
          next(err);
        } else {
          res.status(201).send({project: insertedproject[0]});
        }
      });
    }
  });
});

projectsRouter.param('projectId', (req, res, next, projectId) => {
  const sql = `SELECT * FROM Projects WHERE id=${projectId}`;
  db.query(sql, function(err, project) {
    if (err) {
      next(err);
    } else if (project[0]) {
      req.projectId = projectId;
      req.project = project[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});

// GET /api/projects/:projectId
projectsRouter.get('/:projectId', (req, res, next) => {
  res.status(200).send({project: req.project});
});

// PUT /api/projects/:projectId
projectsRouter.put('/:projectId', mw.validateProject, mw.getProjectValues, (req, res, next) => {
  const sql = 'UPDATE Projects SET ' +
              'name= ? , ' +
              'feast_date= ? , ' +
              'feast_location= ? , ' +
              'civil_ceremony_date= ? , ' +
              'civil_ceremony_location= ? , ' +
              'religious_ceremony_date= ? , ' +
              'religious_location= ? , ' +
              'custom_ceremony_description= ? , ' +
              'custom_ceremony_description_2= ? , ' +
              'custom_ceremony_date= ? , ' +
              'custom_ceremony_location= ? , ' +
              'guests_quantity= ? , ' +
              'pinterest_board_url= ? ' +
              `WHERE id=${req.projectId}`;

  const values = req.values[0];
  // We take out non-modifiable values
  // Quit creationTimestamp
  values.splice(0,1);
  // Quit createdBy
  values.splice(2,1);

  db.query(sql, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM Projects WHERE id=${req.projectId}`, function(err, project) {
        if (err) {
          next(err);
        } else {
          res.send({project: project[0]});
        }
      });
    }
  });
});

const projectServicesRouter = require('./projectServices.js');
projectsRouter.use('/:projectId/services', projectServicesRouter);

module.exports = projectsRouter;
