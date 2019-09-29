const express = require('express');
const db = require('../../db/database');

// project's Middleware
const mw = require('./middleware');

const projectServicesRouter = express.Router();

/***** project Routes *****/
projectServicesRouter.get('/', (req, res, next) => {
  const sql = `SELECT * FROM ProjectServices WHERE Projects_id=${req.projectId}` ;
  db.query(sql, function(err, services) {
    if (err) {
      next(err);
    } else {
      res.status(200).send({services: services});
    }
  });
});

/*
servicesRouter.post('/', mw.validateProject, mw.getProjectValues, (req, res, next) => {
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

servicesRouter.param('projectId', (req, res, next, projectId) => {
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

servicesRouter.get('/:projectId', (req, res, next) => {
  res.status(200).send({project: req.project});
});

servicesRouter.put('/:projectId', mw.validateProject, mw.getProjectValues, (req, res, next) => {
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
*/

module.exports = projectServicesRouter;
