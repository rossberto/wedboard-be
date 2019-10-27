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
//const setDataRequirements = require('./requestRequirements');
const mw = require('../middleware');

const projectsRouter = express.Router();

// Local Middleware
function setDataRequirements(req, res, next) {
  req.minimumRequestData = [
    'creationTimestamp',
    'name',
    'feastDate',
    'createdBy'
  ];

  req.expectedPostData = [
    'creationTimestamp',
    'name',
    'feastDate',
    'createdBy',
    'feastLocation',
    'civilCeremonyDate',
    'civilCeremonyLocation',
    'religiousCeremonyDate',
    'religiousCeremonyLocation',
    'customCeremonyDescription',
    'customCeremonyDescription2',
    'customCeremonyDate',
    'customCeremonyLocation',
    'guestsQuantity',
    'pinterestBoardUrl'
  ];

  req.expectedUpdateData = [
    'name',
    'feastDate',
    'feastLocation',
    'civilCeremonyDate',
    'civilCeremonyLocation',
    'religiousCeremonyDate',
    'religiousCeremonyLocation',
    'customCeremonyDescription',
    'customCeremonyDescription2',
    'customCeremonyDate',
    'customCeremonyLocation',
    'guestsQuantity',
    'pinterestBoardUrl'
  ];

  next();
}

/***** project Routes *****/

// GET /api/projects
projectsRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM Projects';
  db.query(sql, function(err, projects) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(projects);
    }
  });
});

// POST /api/projects
projectsRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
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
  res.status(200).send(req.project);
});

// PUT /api/projects/:projectId
projectsRouter.put('/:projectId', setDataRequirements, mw.getValues, (req, res, next) => {
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

const ordersRouter = require('../orders/orders');
projectsRouter.use('/:projectId/orders', ordersRouter);

const projectUsersRouter = require('./projectUsers');
projectsRouter.use('/:projectId/users', projectUsersRouter);

module.exports = projectsRouter;
