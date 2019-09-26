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

  if (provider.name && provider.country && provider.email &&
      provider.type && provider.joinDate)
  {
    next();
  } else {
    res.status(400).send();
  }
}

function getproviderValues(req, res, next) {
  const provider = req.body.provider;

  if (!provider.lastName2) {
    provider.lastName2 = null;
  }
  if (!provider.birthdate) {
    provider.birthdate = null;
  }

  if (!provider.gender) {
    provider.gender = null;
  }

  if (!provider.phone) {
    provider.phone = null;
  }

  const values = [[
    provider.name,
    provider.lastName,
    provider.lastName2,
    provider.email,
    provider.type,
    provider.joinDate,
    provider.birthdate,
    provider.gender,
    provider.phone
  ]];

  req.values = values;
  next();
}

providersRouter.get('/', (req, res, next) => {
  console.log('GET providers fetched');

  const sql = 'SELECT * FROM providers';
  db.query(sql, function(err, providers) {
    if (err) {next(err)}

    res.status(200).send({providers: providers});
  });
});

providersRouter.post('/', validateprovider, getproviderValues, (req, res, next) => {
  console.log('POST providers fetched');

  let sql = 'INSERT INTO providers (name, last_name, last_name_2, email, ' +
            'type, join_date, birthdate, gender, phone) VALUES ?';
  db.query(sql, [req.values], function(err, result) {
    if (err) {next(err)}

    console.log(result);
    console.log("Number of records inserted: " + result.affectedRows);

    sql = 'SELECT * FROM providers WHERE id= ? LIMIT 1';
    db.query(sql, [result.insertId], function(err, insertedprovider) {
      if (err) {next(err)}

      res.status(201).send({provider: insertedprovider[0]});
    });
  });
});


providersRouter.param('providerId', (req, res, next, providerId) => {
  const sql = `SELECT * FROM providers WHERE id=${providerId}`;
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

providersRouter.put('/:providerId', validateprovider, getproviderValues, (req, res, next) => {
  console.log('UPDATE specific provider fetched');

  const updatedprovider = req.body.provider;

  const sql = 'UPDATE providers SET ' +
              'name= ? , ' +
              'last_name= ? , ' +
              'last_name_2= ? , ' +
              'email= ? , ' +
              'type= ? , ' +
              'join_date= ? , ' +
              'birthdate= ? , ' +
              'gender= ? , ' +
              'phone= ? ' +
              `WHERE id=${req.providerId}`;
  db.query(sql, req.values[0], function(err) {
    if (err) {next(err)}

    db.query(`SELECT * FROM providers WHERE id=${req.providerId}`, (err, provider) => {
      if (err) {next(err)}

      res.send({provider: provider[0]});
    });
  });
});

providersRouter.delete('/:providerId', (req, res, next) => {
  console.log('DELETE specific provider fetched');
  const sql = 'UPDATE providers ' +
              'SET is_forbidden=1 ' +
              `WHERE id=${req.providerId}`;
  db.query(sql, err => {
    if (err) {next(err)}

    db.query(`SELECT * FROM providers WHERE id=${req.providerId}`, (err, provider) => {
      if (err) {next(err)}

      res.send({provider: provider[0]});
    });
  });
});

module.exports = providersRouter;
