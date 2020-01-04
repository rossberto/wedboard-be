/*
      GET /api/projects/:projectId/orders/:orderId/services
      POST /api/projects/:projectId/orders/:orderId/services
*/
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

// GET /api/projects/:projectId/orders/:orderId/services
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

// POST /api/projects/:projectId/orders/:orderId/services
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

module.exports = orderServicesRouter;
