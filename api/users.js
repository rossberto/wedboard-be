const express = require('express');
const usersRouter = express.Router();

/*
const db = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: 'contrasena',
  database: 'wb_db'
});

db.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
});
*/

usersRouter.get('/', (req, res, next) => {
  console.log('GET Users fetched');

  const sql = 'SELECT * FROM Users';

  //db.query(sql, function(err, users) {
  //  if (err) {next(err)}

    res.status(200).send(users);
  //});
});

/*
usersRouter.post('/', validateEmployee, getEmployeeValues, (req, res, next) => {
  const user = undefined;
  res.status(201).send(user);
});
*/

module.exports = usersRouter;
