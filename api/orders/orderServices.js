const express = require('express');
const db = require('../../db/database');

// User's Middleware
const mw = require('../middleware');

const orderServicesRouter = express.Router();

// Local middleware
function setDataRequirements(req, res, next) {
  req.minimumRequestData = [
    'quantity',
    'cost',
    'projectServiceId',
    'providerServiceId'
  ];

  req.expectedData = [
    'quantity',
    'cost',
    'projectServiceId',
    'providerServiceId'
  ];

  next();
}

// Get all services of a given provider
// GET .../orders
orderServicesRouter.get('/', (req, res, next) => {
  const sql = `SELECT * FROM OrderServices WHERE Orders_id=${req.orderId}`;
  db.query(sql, function(err, services) {
    if (err) {
      next(err);
    } else {
      res.status(200).send({services: services});
    }
  });
});

// Add a new service to provider's catalog
// POST .../orders
orderServicesRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  req.values[0].push(req.providerId);

  let sql = 'INSERT INTO ProviderServices (name, description, ' +
            'description_optional, min_range, max_range, range_unit, price, ' +
            'provider_service_code, WedboardServices_id, Providers_id) VALUES ?';
  db.query(sql, [req.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = 'SELECT * FROM ProviderServices WHERE id= ? LIMIT 1';
      db.query(sql, [result.insertId], function(err, insertedService) {
        if (err) {
          next(err);
        } else {
          res.status(201).send({provider: insertedService[0]});
        }
      });
    }
  });
});

/*
orderServicesRouter.param('serviceId', (req, res, next, serviceId) => {
  const sql = `SELECT * FROM ProviderServices WHERE id=${serviceId} ` +
              `AND Providers_id=${req.providerId}`;
  db.query(sql, (err, service) => {
    if (err) {
      next(err);
    } else {
      if (service && service[0]) {
        req.serviceId = serviceId;
        req.service = service[0];
        next();
      } else {
        res.status(404).send();
      }
    }
  });
});

// GET /api/providers/:providerId/services/:serviceId
orderServicesRouter.get('/:serviceId', (req, res, next) => {
  res.status(200).send({service: req.service});
});


// PUT /api/providers/:providerId/services/:serviceId
orderServicesRouter.put('/:serviceId', setDataRequirements, mw.validateRequest, mw.getValues, (req, res, next) => {
  const sql = 'UPDATE ProviderServices SET ' +
              'name= ? , ' +
              'description= ? , ' +
              'description_optional= ? , ' +
              'min_range= ? , ' +
              'max_range= ? , ' +
              'range_unit= ? , ' +
              'price= ? , ' +
              'provider_service_code= ? , ' +
              'WedboardServices_id= ? ' +
              `WHERE id=${req.serviceId} AND Providers_id=${req.providerId}`;
  db.query(sql, req.values[0], function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM ProviderServices WHERE id=${req.serviceId}`, (err, service) => {
        if (err) {
          next(err)
        } else {
          res.status(200).send({service: service[0]});
        }
      });
    }
  });
});


// DELETE /api/providers/:providerId/services/:serviceId
orderServicesRouter.delete('/:serviceId', (req, res, next) => {
  const sql = 'DELETE FROM ProviderServices ' +
              `WHERE id=${req.serviceId} AND Providers_id=${req.providerId}`;
  db.query(sql, err => {
    if (err) {
      next(err);
    } else {
      res.status(204).send();
    }
  });
});
*/
//const orderServicesRouter = require('./providerServices.js');
//orderServicesRouter.use('/services', orderServicesRouter);

module.exports = orderServicesRouter;
