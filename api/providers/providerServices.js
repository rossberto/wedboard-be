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
    'min_range',
    'max_range',
    'range_unit',
    'price',
    'WedboardServices_id'
  ];

  req.expectedPostData = [
    'name',
    'description',
    'description_optional',
    'min_range',
    'max_range',
    'range_unit',
    'price',
    'provider_service_code',
    'WedboardServices_id'
  ];

  req.expectedUpdateData = [
    'name',
    'description',
    'description_optional',
    'min_range',
    'max_range',
    'range_unit',
    'price',
    'provider_service_code',
    'WedboardServices_id'
  ];

  next();
}

function getMore(req, res, next) {
  sql = `SELECT * FROM WedboardServices WHERE id=${req.service.WedboardServices_id}; ` +
        `SELECT * FROM ProviderServicesImages WHERE ProviderServices_id=${req.serviceId}`;
  db.query(sql, function(err, results) {
    if (err) {
      next(err);
    } else {
      delete req.service.WedboardServices_id;
      req.service.wedboardService = results[0][0];
      req.service.images = results[1];

      next();
    }
  });
}

function update(req, res, next) {
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
          next();
          //res.status(200).send({service: service[0]});
        }
      });
    }
  });
}

// Get all services of a given provider
// GET /api/providers/:providerId/services
providerServicesRouter.get('/', (req, res, next) => {
  let sql = `SELECT * FROM ProviderServices WHERE Providers_id=${req.providerId}`;
  db.query(sql, function(err, services) {
    if (err) {
      next(err);
    } else {
      req.services = services;
      sql = '';

      req.services.forEach(service => {
        sql += `SELECT * FROM WedboardServices WHERE id=${service.WedboardServices_id}; `;
      });

      db.query(sql, function(err, results) {
        if (err) {
          next(err);
        } else {
          req.services.forEach((service, index) => {
            delete service.WedboardServices_id;
            service.wedboardService = results[index][0];
          });
          res.status(200).send(req.services);
        }
      });
    }
  });
});

// Add a new service to provider's catalog
// POST /api/providers/:providerId/services
providerServicesRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
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
  console.log(req.body);
  let sql = `SELECT * FROM ProviderServices WHERE id=${serviceId} ` +
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
providerServicesRouter.get('/:serviceId', getMore, (req, res, next) => {
  res.status(200).send(req.service);
});


// PUT /api/providers/:providerId/services/:serviceId
providerServicesRouter.put('/:serviceId', setDataRequirements, mw.getValues, update, (req, res, next) => {
  let sql = `SELECT * FROM ProviderServices WHERE id=${req.serviceId} ` +
              `AND Providers_id=${req.providerId}`;
  db.query(sql, (err, service) => {
    if (err) {
      next(err);
    } else {
      sql = `SELECT * FROM WedboardServices WHERE id=${req.service.WedboardServices_id}; ` +
            `SELECT * FROM ProviderServicesImages WHERE ProviderServices_id=${req.serviceId}`;
      db.query(sql, function(err, results) {
        if (err) {
          next(err);
        } else {
          delete req.service.WedboardServices_id;
          req.service.wedboardService = results[0][0];
          req.service.images = results[1];

          res.status(200).send(req.service);
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

module.exports = providerServicesRouter;
