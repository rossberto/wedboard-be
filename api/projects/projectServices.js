/***** Project Services Routes *****/
/*
    GET /api/projects/:projectId/services
    POST /api/projects/:projectId/services
    GET /api/projects/:projectId/services/:serviceId
    PUT /api/projects/:projectId/services/:serviceId
*/
const express = require('express');
const db = require('../../db/database');

// project's Middleware
const mw = require('../middleware');

const projectServicesRouter = express.Router();

// Local middleware
function setDataRequirements(req, res, next) {
  req.minimumRequestData = [
    'wedboardServiceId'
  ];

  req.expectedPostData = [
    'wedboardServiceId',
    'quantity',
    'comments',
    'comments2'
  ];

  req.expectedUpdateData = [
    'wedboardServiceId',
    'quantity',
    'comments',
    'comments2'
  ];

  next();
}

/***** project Routes *****/

// GET /api/projects/:projectId/services
projectServicesRouter.get('/', (req, res, next) => {
  //const sql = `SELECT * FROM ProjectServices WHERE Projects_id=${req.projectId}` ;
  const sql = 'SELECT * FROM (' +
	               'SELECT Projects_id, ProjectServices.id AS ProjectServices_id, category, service , ' +
                 'quantity, comments, comments_2 ' +
                 'FROM ProjectServices JOIN WedboardServices ' +
                 'ON ProjectServices.WedboardServices_id = WedboardServices.id ' +
              `) TablaDerivada WHERE TablaDerivada.Projects_id=${req.projectId}`;
  db.query(sql, function(err, services) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(services);
    }
  });
});

// POST /api/projects/:projectId/services
projectServicesRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  req.values[0].push(req.projectId);

  let sql = 'INSERT INTO ProjectServices (WedboardServices_id, ' +
            'quantity, comments, comments_2, Projects_id) VALUES ?';
  db.query(sql, [req.values], function(err, result) {
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

projectServicesRouter.param('serviceId', (req, res, next, serviceId) => {
  const sql = `SELECT * FROM ProjectServices WHERE id=${serviceId} ` +
              `AND Projects_id=${req.projectId}`;
  db.query(sql, function(err, service) {
    if (err) {
      next(err);
    } else if (service[0]) {
      req.serviceId = serviceId;
      req.service = service[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});

// GET /api/projects/:projectId/services/:serviceId
projectServicesRouter.get('/:serviceId', (req, res, next) => {
  res.status(200).send({service: req.service});
});

// PUT /api/projects/:projectId/services/:serviceId
projectServicesRouter.put('/:serviceId', setDataRequirements, mw.getValues, (req, res, next) => {
  const sql = 'UPDATE ProjectServices SET ' +
              'WedboardServices_id= ? , ' +
              'quantity= ? , ' +
              'comments= ? , ' +
              'comments_2= ? ' +
              `WHERE id=${req.serviceId} AND Projects_id=${req.projectId}`;

  const values = req.values[0];
  // We take out non-modifiable values
  // Quit projectId
  values.splice(4,1);
  console.log(values);

  db.query(sql, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM ProjectServices WHERE id=${req.serviceId}`, function(err, service) {
        if (err) {
          next(err);
        } else {
          res.send({service: service[0]});
        }
      });
    }
  });
});


module.exports = projectServicesRouter;
