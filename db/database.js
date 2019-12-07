const mysql = require('mysql');

/* For Cloud server */
// Heroku CLEARDB_DATABASE_URL (heroku config | grep CLEARDB_DATABASE_URL)
// mysql://b7711e16555096:55792152@us-cdbr-iron-east-05.cleardb.net/heroku_0c5078081bd3dc6?reconnect=true
/*
const connection = mysql.createPool({
  multipleStatements: true,
  host    : 'us-cdbr-iron-east-05.cleardb.net',   //'localhost',
  user    : 'b7711e16555096',                     //'root',
  password: '55792152',                           //'contrasena',
  database: 'heroku_0c5078081bd3dc6'              //'mydb'
});
*/
const connection = mysql.createPool({
  multipleStatements: true,
  host    : 'localhost',
  user    : 'root',
  password: 'contrasena',
  database: 'mydb'
});

/*
connection.getConnection(function(err, connection) {
  if (err) throw err;

  console.log("Connected!");
});
*/

module.exports = connection;
