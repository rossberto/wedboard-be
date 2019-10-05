const express = require('express');
const db = require('../../db/database');

// User's Middleware
const mw = require('../middleware');

const providerServicesRouter = express.Router();

// Local middleware
function setDataRequirements(req, res, next) {
  req.minimumRequestData = [
    'name',
    'description',
    'minRange',
    'maxRange',
    'rangeUnit',
    'price',
    'wedboardServiceId'
  ];

  req.expectedData = [
    'name',
    'description',
    'descriptionOptional',
    'minRange',
    'maxRange',
    'rangeUnit',
    'price',
    'providerServiceCode',
    'wedboardServiceId'
  ];

  next();
}

// Get all services of a given provider
// GET /api/providers/:providerId/services
providerServicesRouter.get('/', (req, res, next) => {
  const sql = `SELECT * FROM ProviderServices WHERE Providers_id=${req.providerId}`;
  db.query(sql, function(err, services) {
    if (err) {
      next(err);
    } else {
      res.status(200).send({services: services});
    }
  });
});

// Add a new service to provider's catalog
// POST /api/providers/:providerId/services
providerServicesRouter.post('/', setDataRequirements, mw.validateRequest, mw.getValues, (req, res, next) => {
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


providerServicesRouter.param('serviceId', (req, res, next, serviceId) => {
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
providerServicesRouter.get('/:serviceId', (req, res, next) => {
  res.status(200).send({service: req.service});
});


// PUT /api/providers/:providerId/services/:serviceId
providerServicesRouter.put('/:serviceId', setDataRequirements, mw.validateRequest, mw.getValues, (req, res, next) => {
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
providerServicesRouter.delete('/:serviceId', (req, res, next) => {
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

//const providerServicesRouter = require('./providerServices.js');
//providerServicesRouter.use('/services', providerServicesRouter);

module.exports = providerServicesRouter;
