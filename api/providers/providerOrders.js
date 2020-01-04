/*
      GET /api/providers/:providerId/orders
      GET /api/providers/:providerId/orders/:orderId
*/
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
          if (results.length > 1) {
            req.orders.forEach((order, index) => {
              order.projectName = results[index][0].name;
            });
          } else {
            req.orders[0].projectName = results[0].name;
          }

          res.status(200).send(req.orders);
        }
      });
    }
  });
});

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

        sql  = `SELECT * FROM OrderServices JOIN ProviderServices ON OrderServices.ProviderServices_id=ProviderServices.id WHERE Orders_id=${req.orderId}; `;
        sql += `SELECT * FROM Projects WHERE id=${req.order.Projects_id}; `;
        sql += `SELECT * FROM Payments WHERE Orders_id=${req.orderId}`
        db.query(sql, function(err, results) {
          if (err) {
            next(err);
          } else {
            req.order.services = results[0]; // Es un array
            req.order.project = results[1][0]; // Es un elemento unico
            req.order.payments = results[2]; // Es un array que puede ser vacio

            sql = '';
            req.order.services.forEach(service => {
              sql += `SELECT * FROM ProviderServicesImages WHERE ProviderServices_id=${service.ProviderServices_id}; `;
            });

            db.query(sql, function(err, results) {
              if (err) {
                next(err);
              } else {
                if (results.length > 0) {
                /*  req.order.services.forEach((service, index) => {
                    if (results[0][0]) {
                      console.log('no es vacio');
                      service.images = results[index];
                    } else { //if (results.length !== 0){
                      console.log('es vacio');
                      service.images = results;
                    }
                  });
                */next();
                } else {
                  next();
                }
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

module.exports = providerOrdersRouter;
