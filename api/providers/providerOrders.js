const express = require('express');
const db = require('../../db/database');

// User's Middleware
const mw = require('../middleware');

const providerOrdersRouter = express.Router();

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
    'provider_order_code',
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
    'provider_order_code',
    'WedboardServices_id'
  ];

  next();
}
/*
function getMore(req, res, next) {
  sql = `SELECT * FROM WedboardServices WHERE id=${req.order.WedboardServices_id}; ` +
        `SELECT * FROM ProviderServicesImages WHERE ProviderServices_id=${req.orderId}`;
  db.query(sql, function(err, results) {
    if (err) {
      next(err);
    } else {
      delete req.order.WedboardServices_id;
      req.order.wedboardService = results[0][0];
      req.order.images = results[1];

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
              'provider_order_code= ? , ' +
              'WedboardServices_id= ? ' +
              `WHERE id=${req.orderId} AND Providers_id=${req.providerId}`;
  db.query(sql, req.values[0], function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM ProviderServices WHERE id=${req.orderId}`, (err, order) => {
        if (err) {
          next(err)
        } else {
          next();
          //res.status(200).send({order: order[0]});
        }
      });
    }
  });
}
*/
// Get all orders of a given provider
// GET /api/providers/:providerId/orders
providerOrdersRouter.get('/', (req, res, next) => {
  let sql = `SELECT * FROM Orders WHERE Providers_id=${req.providerId}`;
  db.query(sql, function(err, orders) {
    if (err) {
      next(err);
    } else {
      req.orders = orders;
      sql = '';

      orders.forEach(order => {
        sql += `SELECT name FROM Projects WHERE id=${order.Projects_id}; `
      });

      db.query(sql, function(err, results) {
        if (err) {
          next(err);
        } else {
          req.orders.forEach((order, index) => {
            order.projectName = results[index][0].name;
          });
          res.status(200).send(req.orders);
        }
      });
    }
  });
});
/*
// Add a new order to provider's catalog
// POST /api/providers/:providerId/orders
providerOrdersRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  req.values[0].push(req.providerId);

  let sql = 'INSERT INTO ProviderServices (name, description, ' +
            'description_optional, min_range, max_range, range_unit, price, ' +
            'provider_order_code, WedboardServices_id, Providers_id) VALUES ?';
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
*/

providerOrdersRouter.param('orderId', (req, res, next, orderId) => {
  let sql = `SELECT * FROM Orders WHERE id=${orderId} ` +
              `AND Providers_id=${req.providerId}`;
  db.query(sql, (err, order) => {
    if (err) {
      next(err);
    } else {
      if (order && order[0]) {
        req.orderId = orderId;
        req.order = order[0];

        sql  = `SELECT * FROM OrderServices WHERE Orders_id=${req.orderId}; `;
        sql += `SELECT * FROM Projects WHERE id=${req.order.Projects_id}; `;
        sql += `SELECT * FROM Payments WHERE Orders_id=${req.orderId}`
        db.query(sql, function(err, results) {
          if (err) {
            next(err);
          } else {
            req.order.services = results[0];
            req.order.project = results[1][0];

            if (results[2]) {
              req.order.payments = results[2];
            }
            console.log(results);
            sql = '';
            req.order.services.forEach(service => {
              sql += `SELECT * FROM ProviderServicesImages WHERE ProviderServices_id=${service.ProviderServices_id}; `;
            });

            db.query(sql, function(err, results) {
              if (err) {
                next(err);
              } else {
                console.log(results);
                req.order.services.forEach((service, index) => {
                  if (results[0][0]) {
                    service.images = results[index];
                  } else if (results.length !== 0){
                    service.images = results;
                  }
                });
                next();
              }
            });
          }
        });
      } else {
        res.status(404).send();
      }
    }
  });
});

// GET /api/providers/:providerId/orders/:orderId
providerOrdersRouter.get('/:orderId', (req, res, next) => {
  res.status(200).send(req.order);
});

/*
// PUT /api/providers/:providerId/orders/:orderId
providerOrdersRouter.put('/:orderId', setDataRequirements, mw.getValues, update, (req, res, next) => {
  let sql = `SELECT * FROM ProviderServices WHERE id=${req.orderId} ` +
              `AND Providers_id=${req.providerId}`;
  db.query(sql, (err, order) => {
    if (err) {
      next(err);
    } else {
      sql = `SELECT * FROM WedboardServices WHERE id=${req.order.WedboardServices_id}; ` +
            `SELECT * FROM ProviderServicesImages WHERE ProviderServices_id=${req.orderId}`;
      db.query(sql, function(err, results) {
        if (err) {
          next(err);
        } else {
          delete req.order.WedboardServices_id;
          req.order.wedboardService = results[0][0];
          req.order.images = results[1];

          res.status(200).send(req.order);
        }
      });
    }
  });
});


// DELETE /api/providers/:providerId/orders/:orderId
providerOrdersRouter.delete('/:orderId', (req, res, next) => {
  const sql = 'DELETE FROM ProviderServices ' +
              `WHERE id=${req.orderId} AND Providers_id=${req.providerId}`;
  db.query(sql, err => {
    if (err) {
      next(err);
    } else {
      res.status(204).send();
    }
  });
});

const providerServicesImagesRouter = require('./providerServicesImages.js');
providerOrdersRouter.use('/:orderId/images', providerServicesImagesRouter);
*/
module.exports = providerOrdersRouter;
