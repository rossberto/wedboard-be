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

const budgetsRouter = express.Router();

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
    'status',
    'googleDriveUrl',
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
    'status',
    'googleDriveUrl',
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

// GET /api/budgets
budgetsRouter.get('/', (req, res, next) => {
  let sql = 'SELECT Projects.id, name, total_budget, BudgetDistribution.* FROM Projects JOIN ProjectBalance ON Projects.id=ProjectBalance.Projects_id JOIN BudgetDistribution ON ProjectBalance.BudgetDistribution_id=BudgetDistribution.id';
  db.query(sql, function(err, projects) {
    if (err) {
      next(err);
    } else {
      if (projects.length > 0) {
        sql = '';
        for (let i=0; i<projects.length; i++) {
          sql += `SELECT Users_id, name, type FROM ProjectUsers JOIN Users ON ProjectUsers.Users_id=Users.id WHERE Projects_id=${projects[i].id} AND type='Couple'; `;
        }

        db.query(sql, function(err, results) {
          if (err) {
            next(err);
          } else {
            if (results[0][0]) {
              projects.forEach((project, index) => {
                project.couple = results[index];
              });
            } else {
              projects[0].couple = results;
            }
            res.status(200).send(projects);
          }
        });
      } else {
        res.status(200).send(projects);
      }
    }
  });
});
/*
// POST /api/projects
budgetsRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  let sql = 'INSERT INTO Projects (creation_timestamp, name, feast_date, created_by, ' +
            'status, google_drive_url, ' +
            'feast_location, civil_ceremony_date, civil_ceremony_location, ' +
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

budgetsRouter.param('projectId', (req, res, next, projectId) => {
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
budgetsRouter.get('/:projectId', (req, res, next) => {
  const sql = `SELECT * FROM ProjectUsers WHERE Projects_id=${req.projectId}`;
  db.query(sql, function(err, users) {
    if (err) {
      next(err);
    } else {
      couple = users.filter(user => user.type === 'Couple');
      console.log(couple);
      req.project.couple = couple;
      res.status(200).send(req.project);
    }
  });
});

// PUT /api/projects/:projectId
budgetsRouter.put('/:projectId', setDataRequirements, mw.getValues, (req, res, next) => {
  const sql = 'UPDATE Projects SET ' +
              'name= ? , ' +
              'feast_date= ? , ' +
              'status= ?, ' +
              'google_drive_url= ?' +
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
budgetsRouter.use('/:projectId/services', projectServicesRouter);

const ordersRouter = require('../orders/orders');
budgetsRouter.use('/:projectId/orders', ordersRouter);

const projectUsersRouter = require('./projectUsers');
budgetsRouter.use('/:projectId/users', projectUsersRouter);

const projectTodosRouter = require('./projectTodos');
budgetsRouter.use('/:projectId/todos', projectTodosRouter);

const projectSurveyRouter = require('./projectSurvey');
budgetsRouter.use('/:projectId/survey', projectSurveyRouter);
*/
module.exports = budgetsRouter;
