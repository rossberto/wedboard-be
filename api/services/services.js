/*
      GET /api/services
      POST /api/services
      GET /api/services/:serviceId
      PUT /api/services/:serviceId
*/
const express = require('express');
const db = require('../../db/database');

const servicesRouter = express.Router();

/***** middleware *****/
function validateService(req, res, next) {
  const service = req.body.service;

  if (service.service && service.category) {
    next();
  } else {
    res.status(400).send();
  }
}

/***** services Routes *****/
// GET /api/services
servicesRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM WedboardServices';
  db.query(sql, function(err, services) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(services);
    }
  });
});

// POST /api/services
servicesRouter.post('/', validateService, (req, res, next) => {
  const values = [[req.body.service.service, req.body.service.category]];

  let sql = 'INSERT INTO WedboardServices (service, category) VALUES ?';
  db.query(sql, [values], function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = 'SELECT * FROM WedboardServices WHERE id= ? LIMIT 1';
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

servicesRouter.param('serviceId', (req, res, next, serviceId) => {
  const sql = `SELECT * FROM Projects WHERE id=${serviceId}`;
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

// GET /api/services/:serviceId
servicesRouter.get('/:serviceId', (req, res, next) => {
  res.status(200).send({service: req.service});
});

// PUT /api/services/:serviceId
servicesRouter.put('/:serviceId', validateService, (req, res, next) => {
  const sql = 'UPDATE WedboardServices SET ' +
              'service= ? , ' +
              'category= ? ' +
              `WHERE id=${req.serviceId}`;

  const values = [req.body.service.service, req.body.service.category];

  db.query(sql, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM WedboardServices WHERE id=${req.serviceId}`, function(err, service) {
        if (err) {
          next(err);
        } else {
          res.send({service: service[0]});
        }
      });
    }
  });
});

module.exports = servicesRouter;
