const express = require('express');

const db = require('../db/database');
//const mysql = require('mysql');

const providersRouter = express.Router();
/*
const db = mysql.createConnection({
  host    : 'localhost',
  provider    : 'root',
  password: 'contrasena',
  database: 'mydb'
});

db.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
});
*/
/***** Auxiliar Functions *****/
function validateProvider(req, res, next) {
  const provider = req.body.provider;

  if (provider.name  && provider.country &&
      provider.state && provider.city)
  {
    next();
  } else {
    res.status(400).send();
  }
}

function getProviderValues(req, res, next) {
  const provider = req.body.provider;

  if (!provider.zipCode) {
    provider.zipCode = null;
  }
  if (!provider.address) {
    provider.address = null;
  }

  if (!provider.addressOptional) {
    provider.addressOptional = null;
  }

  if (!provider.phone) {
    provider.phone = null;
  }

  if (!provider.webPage) {
    provider.webPage = null;
  }

  const values = [[
    provider.name,
    provider.isActive,
    provider.country,
    provider.state,
    provider.city,
    provider.zipCode,
    provider.address,
    provider.addressOptional,
    provider.phone,
    provider.webPage
  ]];

  req.values = values;
  next();
}

providersRouter.get('/', (req, res, next) => {
  console.log('GET providers fetched');

  const sql = 'SELECT * FROM Providers';
  db.query(sql, function(err, providers) {
    if (err) {next(err)}

    res.status(200).send({providers: providers});
  });
});

providersRouter.post('/', validateProvider, getProviderValues, (req, res, next) => {
  console.log('POST providers fetched');

  let sql = 'INSERT INTO Providers (name, is_active, country, state, city, ' +
            'zip_code, address, address_optional, phone, web_page) VALUES ?';
  db.query(sql, [req.values], function(err, result) {
    if (err) {next(err)}

    console.log(result);
    console.log("Number of records inserted: " + result.affectedRows);

    sql = 'SELECT * FROM Providers WHERE id= ? LIMIT 1';
    db.query(sql, [result.insertId], function(err, insertedProvider) {
      if (err) {next(err)}

      res.status(201).send({provider: insertedProvider[0]});
    });
  });
});


providersRouter.param('providerId', (req, res, next, providerId) => {
  const sql = `SELECT * FROM Providers WHERE id=${providerId}`;
  db.query(sql, (err, provider) => {
    if (err) {next(err)}

    console.log(provider);

    if (provider) {
      req.providerId = providerId;
      req.provider = provider[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});

providersRouter.get('/:providerId', (req, res, next) => {
  console.log('GET specific provider fetched');

  res.status(200).send({provider: req.provider});
});

providersRouter.put('/:providerId', validateProvider, getProviderValues, (req, res, next) => {
  console.log('UPDATE specific provider fetched');

  const updatedProvider = req.body.provider;

  const sql = 'UPDATE Providers SET ' +
              'name= ? , ' +
              'is_active= ? , ' +
              'country= ? , ' +
              'state= ? , ' +
              'city= ? , ' +
              'zip_code= ? , ' +
              'address= ? , ' +
              'address_optional= ? , ' +
              'phone= ? ' +
              'web_page= ? ' +
              `WHERE id=${req.providerId}`;
  db.query(sql, req.values[0], function(err) {
    if (err) {next(err)}

    db.query(`SELECT * FROM Providers WHERE id=${req.providerId}`, (err, provider) => {
      if (err) {next(err)}

      res.send({provider: provider[0]});
    });
  });
});

providersRouter.delete('/:providerId', (req, res, next) => {
  console.log('DELETE specific provider fetched');

  const sql = 'UPDATE providers ' +
              'SET is_active=0 ' +
              `WHERE id=${req.providerId}`;
  db.query(sql, err => {
    if (err) {next(err)}

    db.query(`SELECT * FROM Providers WHERE id=${req.providerId}`, (err, provider) => {
      if (err) {next(err)}

      res.send({provider: provider[0]});
    });
  });
});

module.exports = providersRouter;
