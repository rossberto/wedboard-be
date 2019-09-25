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

  const values = [[
    user.name,
    user.lastName,
    user.email,
    user.type,
    user.joinDate
  ]];
  
/*
  if (user.birthdate) {
    values.$birthdate = user.birthdate;
  }

  if (user.gender) {
    values.$gender = user.gender;
  }

  if (user.phone) {
    values.$phone = user.phone;
  }

  if (user.token) {
    values.$token = user.token;
  }
*/


  req.values = values;
  next();
}

usersRouter.get('/', (req, res, next) => {
  console.log('GET Users fetched');

  const sql = 'SELECT * FROM Users';

  db.query(sql, function(err, users) {
    if (err) {next(err)}

    res.status(200).send(users);
  });
});

usersRouter.post('/', validateUser, getUserValues, (req, res, next) => {
  console.log('POST Users fetched');

  let sql = 'INSERT INTO Users (name, last_name, email, type, join_date) ' +
            'VALUES ?';
  console.log(req.values);
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

  console.log(sql);

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
  res.status(200).send({user: req.user});
});
/*
usersRouter.put('/:employeeId', validateUser, getUserValues, (req, res, next) => {
  const updatedUser = req.body.user;

  const sql = 'UPDATE Users SET ' +
              'name=$name, ' +
              'position=$position, ' +
              'wage=$wage ' +
              'WHERE id=$id';
  db.run(sql, req.values, function(err) {
    if (err) {next(err)}

    db.get(`SELECT * FROM Employee WHERE id=${req.employeeId}`, (err, row) => {
      if (err) {next(err)}

      res.send({employee: row});
    });

  });
});

usersRouter.delete('/:employeeId', (req, res, next) => {
  const sql = 'UPDATE Employee ' +
              'SET is_current_employee=0 ' +
              'WHERE id=$id';
  db.run(sql, {$id: req.employeeId}, err => {
    if (err) {next(err)}

    db.get(`SELECT * FROM Employee WHERE id=${req.employeeId}`, (err, row) => {
      if (err) {next(err)}

      res.send({employee: row});
    });
  });
});
*/
module.exports = usersRouter;
