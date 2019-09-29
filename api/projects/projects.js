const express = require('express');
const db = require('../../db/database');

// project's Middleware
const mw = require('./middleware');

const projectsRouter = express.Router();

/***** project Routes *****/
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

projectsRouter.get('/:projectId', (req, res, next) => {
  res.status(200).send({project: req.project});
});

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
/*
projectsRouter.delete('/:projectId', (req, res, next) => {
  const sql = 'UPDATE projects ' +
              'SET is_forbidden=1 ' +
              `WHERE id=${req.projectId}`;
  db.query(sql, function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM projects WHERE id=${req.projectId}`, function(err, project) {
        if (err) {
          next(err);
        } else {
          res.status(200).send({project: project[0]});
        }
      });
    }
  });
});
*/

const projectServicesRouter = require('./projectServices.js');
projectServicesRouter.use('/:projectId/services', projectServicesRouter);
/*
projectsRouter.get('/:projectId/details', (req, res, next) => {
  const type = req.project.type;
  const sql = `SELECT * FROM ${type}projects WHERE projects_id=${req.projectId}`;
  db.query(sql, function(err, details) {
    if (err) {
      next(err);
    } else if (details[0]) {
      res.status(200).send({project: details[0]});
    } else {
      res.status(404).send();
    }
  });
});

projectsRouter.post('/:projectId/details', mw.validateprojectDetails, mw.getprojectDetails, mw.getSqlCommand, (req, res, next) => {
  db.query(req.sql, [req.details], function(err, result) {
    if (err) {
      next(err);
    } else {
      const type = req.project.type;
      const sql = `SELECT * FROM ${type}projects WHERE id= ? LIMIT 1`;
      db.query(sql, [result.insertId], function(err, insertedprojectDetails) {
        if (err) {
          next(err);
        } else {
          res.status(201).send({projectDetails: insertedprojectDetails[0]});
        }
      });
    }
  });
});

projectsRouter.put('/:projectId/details', mw.validateprojectDetails, mw.getprojectDetails, mw.getSqlCommand, (req, res, next) => {
  db.query(req.sql, req.details[0], function(err, result) {
    if (err) {
      next(err);
    } else {
      const type = req.project.type;
      const sql = `SELECT * FROM ${type}projects WHERE projects_id=${req.projectId}  LIMIT 1`;
      db.query(sql, function(err, insertedprojectDetails) {
        console.log(insertedprojectDetails);
        if (err) {
          next(err);
        } else {
          res.status(200).send({projectDetails: insertedprojectDetails[0]});
        }
      });
    }
  });
});
*/
module.exports = projectsRouter;
