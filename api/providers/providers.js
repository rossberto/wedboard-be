const express = require('express');
const db = require('../../db/database');

// User's Middleware
const mw = require('./middleware');

const providersRouter = express.Router();

// GET /api/providers
providersRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM Providers';
  db.query(sql, function(err, providers) {
    if (err) {
      next(err);
    } else {
      res.status(200).send({providers: providers});
    }
  });
});

// POST /api/providers
providersRouter.post('/', mw.validateProvider, mw.getProviderValues, (req, res, next) => {
  let sql = 'INSERT INTO Providers (name, is_active, country_iso_a3c, state, city, ' +
            'join_date, zip_code, address, address_optional, phone, web_page) VALUES ?';
  db.query(sql, [req.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = 'SELECT * FROM Providers WHERE id= ? LIMIT 1';
      db.query(sql, [result.insertId], function(err, insertedProvider) {
        if (err) {
          next(err);
        } else {
          res.status(201).send({provider: insertedProvider[0]});
        }
      });
    }
  });
});


providersRouter.param('providerId', (req, res, next, providerId) => {
  const sql = `SELECT * FROM Providers WHERE id=${providerId}`;
  db.query(sql, (err, provider) => {
    if (err) {
      next(err);
    } else {
      if (provider) {
        req.providerId = providerId;
        req.provider = provider[0];
        next();
      } else {
        res.status(404).send();
      }
    }
  });
});

// GET /api/providers/:providerId
providersRouter.get('/:providerId', (req, res, next) => {
  res.status(200).send({provider: req.provider});
});

// PUT /api/providers/:providerId
providersRouter.put('/:providerId', mw.validateProvider, mw.getProviderValues, (req, res, next) => {
  const sql = 'UPDATE Providers SET ' +
              'name= ? , ' +
              'is_active= ? , ' +
              'country_iso_a3c= ? , ' +
              'state= ? , ' +
              'city= ? , ' +
              'join_date= ? , ' +
              'zip_code= ? , ' +
              'address= ? , ' +
              'address_optional= ? , ' +
              'phone= ? , ' +
              'web_page= ? ' +
              `WHERE id=${req.providerId}`;
  db.query(sql, req.values[0], function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM Providers WHERE id=${req.providerId}`, (err, provider) => {
        if (err) {
          next(err)
        } else {
          res.status(200).send({provider: provider[0]});
        }
      });
    }
  });
});

// DELETE /api/providers/:providerId
providersRouter.delete('/:providerId', (req, res, next) => {
  console.log('DELETE specific provider fetched');

  const sql = 'UPDATE Providers ' +
              'SET is_active=0 ' +
              `WHERE id=${req.providerId}`;
  db.query(sql, err => {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM Providers WHERE id=${req.providerId}`, (err, provider) => {
        if (err) {
          next(err);
        } else {
          res.status(200).send({provider: provider[0]});
        }
      });
    }
  });
});

module.exports = providersRouter;
