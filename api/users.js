const express = require('express');
const mysql = require('mysql');

const usersRouter = express.Router();

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
/*
  const values = {
    $name: user.name,
    $lastName: user.position,
    $email: user.wage,
    $type: user.type,
    $joinDate: user.joinDate
  };

  if (req.userId) {
    values.$id = req.userId;
  }

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
  const values = [[user.name, user.lastName, user.email, user.type, user.joinDate]];

  req.values = values;
  next();
}

usersRouter.get('/', (req, res, next) => {
  console.log('GET Users fetched');

  const sql = 'SELECT * FROM Users';

  db.query(sql, function(err, users) {
    if (err) {next(err)}

    db.end()
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

      db.end();
      res.status(201).send({user: insertedUser[0]});
    });
  });
});

module.exports = usersRouter;
