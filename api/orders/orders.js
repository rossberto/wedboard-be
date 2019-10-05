/***** Projects Routes *****/
/*
    GET /api/projects/:projectId/orders
    POST /api/projects/:projectId/orders
*/
const express = require('express');
const db = require('../../db/database');

// project's Middleware
const mw = require('../middleware');

const ordersRouter = express.Router();

// Local middleware
function setDataRequirements(req, res, next) {
  req.minimumRequestData = [
    'date',
    'status',
    'amount',
    'providerId'
  ];

  req.expectedData = [
    'date',
    'comments',
    'status',
    'amount',
    'providerId'
  ];

  next();
}

/***** project Routes *****/

// GET /api/projects/:projectId/orders
ordersRouter.get('/', (req, res, next) => {
  console.log('En GET orders');
  const sql = `SELECT * FROM Orders WHERE Projects_id=${req.projectId}`;
  db.query(sql, function(err, projects) {
    if (err) {
      next(err);
    } else {
      res.status(200).send({projects: projects});
    }
  });
});

// POST /api/projects/:projectId/orders
ordersRouter.post('/', setDataRequirements, mw.validateRequest, mw.getValues, (req, res, next) => {
  req.values[0].push(req.projectId);

  let sql = 'INSERT INTO Orders (date, comments, status, amount, Providers_id, ' +
            'Projects_id) VALUES ?';
  db.query(sql, [req.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = 'SELECT * FROM Orders WHERE id= ? LIMIT 1';
      db.query(sql, [result.insertId], function(err, insertedOrder) {
        if (err) {
          next(err);
        } else {
          res.status(201).send({order: insertedOrder[0]});
        }
      });
    }
  });
});

ordersRouter.param('orderId', (req, res, next, orderId) => {
  const sql = `SELECT * FROM Orders WHERE id=${orderId} AND Projects_id=${req.projectId} LIMIT 1`;
  db.query(sql, function(err, order) {
    if (err) {
      next(err);
    } else if (order[0]) {
      req.orderId = orderId;
      req.order = order[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});


// GET /api/projects/:projectId/orders/:orderId
ordersRouter.get('/:orderId', (req, res, next) => {
  res.status(200).send({order: req.order});
});

// PUT /api/projects/:projectId/orders/:orderId
ordersRouter.put('/:orderId', setDataRequirements, mw.validateRequest, mw.getValues, (req, res, next) => {
  const sql = 'UPDATE Orders SET ' +
              'date= ? , ' +
              'comments= ? , ' +
              'status= ? , ' +
              'amount= ? , ' +
              'Providers_id= ? ' +
              `WHERE id=${req.orderId} AND Projects_id=${req.projectId}`;
  const values = req.values[0];

  db.query(sql, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM Orders WHERE id=${req.orderId}`, function(err, order) {
        if (err) {
          next(err);
        } else {
          res.send({order: order[0]});
        }
      });
    }
  });
});

// DELETE /api/projects/:projectId/orders/:orderId
ordersRouter.delete('/:orderId', (req, res, next) => {
  db.query(`DELETE FROM Orders WHERE id=${req.orderId} AND Projects_id=${req.projectId}`, function(err) {
    if (err) {
      next(err);
    } else {
      res.status(204).send();
    }
  });
});
/*
const orderServicesRouter = require('./orderServices');
ordersRouter.use('/:orderId/services', orderServicesRouter);
*/
module.exports = ordersRouter;
