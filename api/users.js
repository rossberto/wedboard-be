const express = require('express');

const db = require('../db/database');
//const mysql = require('mysql');

const usersRouter = express.Router();
/*
const db = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: 'contrasena',
  database: 'mydb'
});

db.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
});
*/
/***** Auxiliar Functions *****/
function validateUser(req, res, next) {
  const user = req.body.user;

  if (user.name && user.lastName && user.email &&
      user.type && user.joinDate)
  {
    next();
  } else {
    res.status(400).send();
  }
}

function getUserValues(req, res, next) {
  const user = req.body.user;

  if (!user.lastName2) {
    user.lastName2 = null;
  }
  if (!user.birthdate) {
    user.birthdate = null;
  }

  if (!user.gender) {
    user.gender = null;
  }

  if (!user.phone) {
    user.phone = null;
  }

  const values = [[
    user.name,
    user.lastName,
    user.lastName2,
    user.email,
    user.type,
    user.joinDate,
    user.birthdate,
    user.gender,
    user.phone
  ]];

  req.values = values;
  next();
}

usersRouter.get('/', (req, res, next) => {
  console.log('GET Users fetched');

  const sql = 'SELECT * FROM Users';
  db.query(sql, function(err, users) {
    if (err) {next(err)}

    res.status(200).send({users: users});
  });
});

usersRouter.post('/', validateUser, getUserValues, (req, res, next) => {
  console.log('POST Users fetched');

  let sql = 'INSERT INTO Users (name, last_name, last_name_2, email, ' +
            'type, join_date, birthdate, gender, phone) VALUES ?';
  db.query(sql, [req.values], function(err, result) {
    if (err) {next(err)}

    console.log(result);
    console.log("Number of records inserted: " + result.affectedRows);

    sql = 'SELECT * FROM Users WHERE id= ? LIMIT 1';
    db.query(sql, [result.insertId], function(err, insertedUser) {
      if (err) {next(err)}

      res.status(201).send({user: insertedUser[0]});
    });
  });
});


usersRouter.param('userId', (req, res, next, userId) => {
  const sql = `SELECT * FROM Users WHERE id=${userId}`;
  db.query(sql, (err, user) => {
    if (err) {next(err)}

    console.log(user);

    if (user) {
      req.userId = userId;
      req.user = user[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});

usersRouter.get('/:userId', (req, res, next) => {
  console.log('GET specific User fetched');

  res.status(200).send({user: req.user});
});

usersRouter.put('/:userId', validateUser, getUserValues, (req, res, next) => {
  console.log('UPDATE specific User fetched');

  const updatedUser = req.body.user;

  const sql = 'UPDATE Users SET ' +
              'name= ? , ' +
              'last_name= ? , ' +
              'last_name_2= ? , ' +
              'email= ? , ' +
              'type= ? , ' +
              'join_date= ? , ' +
              'birthdate= ? , ' +
              'gender= ? , ' +
              'phone= ? ' +
              `WHERE id=${req.userId}`;
  db.query(sql, req.values[0], function(err) {
    if (err) {next(err)}

    db.query(`SELECT * FROM Users WHERE id=${req.userId}`, (err, user) => {
      if (err) {next(err)}

      res.send({user: user[0]});
    });
  });
});

usersRouter.delete('/:userId', (req, res, next) => {
  console.log('DELETE specific User fetched');
  const sql = 'UPDATE Users ' +
              'SET is_forbidden=1 ' +
              `WHERE id=${req.userId}`;
  db.query(sql, err => {
    if (err) {next(err)}

    db.query(`SELECT * FROM Users WHERE id=${req.userId}`, (err, user) => {
      if (err) {next(err)}

      res.send({user: user[0]});
    });
  });
});

module.exports = usersRouter;
