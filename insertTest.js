const mysql = require('mysql');

const db = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: 'contrasena',
  database: 'mydb'
});

user = {
  name: 'Wariaasd',
  lastName: 'Ticaafsdfnora',
  email: 'mariasdfat@correo.com',
  type: 'planner',
  joinDate: '2019-01-12'
}

const values = [[user.name, user.lastName, user.email, user.type, user.joinDate]];

console.log(values);

db.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
});

let sql = 'INSERT INTO Users (name, last_name, email, type, join_date) ' +
          'VALUES ?';

db.query(sql, [values], function(err, result) {
  if (err) throw err;

  console.log(result);

  console.log("Number of records inserted: " + result.affectedRows);

  let sql = 'SELECT * FROM Users WHERE id= ?';

  db.query(sql, [result.insertId], function(err, insertedUser) {
    if (err) throw err;

    console.log(insertedUser);
    db.end();
  });
});
