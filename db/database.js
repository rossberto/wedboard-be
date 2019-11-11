const mysql = require('mysql');

const connection = mysql.createConnection({
  multipleStatements: true,
  host    : 'localhost',
  user    : 'root',
  password: 'contrasena',
  database: 'mydb'
});

connection.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
});

module.exports = connection;
