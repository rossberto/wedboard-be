/***** Users Routes *****/
/*
    GET /api/users
    POST /api/users
    GET /api/users/:userId
    PUT /api/users/:userId
    DELETE /api/users/:userId
*/
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../db/database');

// User's Middleware
const mw = require('../middleware');

const authRouter = express.Router();

const jwtConfig = {
    "secret"   : "some-secret-code-goes-here",
    "expiresIn": "2 days" // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};

// Local Middleware
function setDataRequirements(req, res, next) {
  console.log(req.params);

  req.minimumRequestData = [
  ];

  req.expectedPostData = [
  ];

  req.expectedUpdateData = [
  ];

  next();
}

/***** User Routes *****/
// GET /api/users
authRouter.post('/', (req, res, next) => {
  console.log('Checando credenciales');
  console.log(req.body);

  const {email, password} = req.body.data;
  const error = {
    email: null,
    password: null
  };

  const sql = `SELECT * FROM Users WHERE email="${email}"`;
  db.query(sql, function(err, user) {
    if (err) {
      next(err);
    } else {
      const error = {
          email   : user[0] ? null : 'Dirección de correo incorrecta',
          password: user[0] && user[0].password === password ? null : 'Contraseña incorrecta'
      };

      if ( !error.email && !error.password && !error.displayName )
      {
          delete user[0]['password'];

          const access_token = jwt.sign({id: user.id}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});

          const response = {
              "user"        : user[0],
              "access_token": access_token
          };

          const displayName = user[0].name + ' ' + user[0].last_name + ' ' + user[0].last_name_2;
          response.user.data = {};
          response.user.data['photoURL'] = user[0].profile_img_url;
          response.user.data['displayName'] = displayName;
          response.user.data['email'] = user[0].email;
          response.user.role = user[0].type;

console.log(response);
          res.status(200).send(response);
      }
      else
      {
          res.status(200).send({error});
      }
    }
  });
});
/*
// POST /api/users
usersRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  let sql = 'INSERT INTO Users (name, last_name, last_name_2, email, ' +
            'type, join_date, birthdate, gender, phone, ' +
            'token, is_online, is_forbidden) VALUES ?';
  db.query(sql, [req.values], function(err, result, fields) {
    if (err) {
      next(err);
    } else {
      sql = 'SELECT * FROM Users WHERE id= ? LIMIT 1';
      db.query(sql, [result.insertId], function(err, insertedUser) {
        if (err) {
          next(err);
        } else {
          res.status(201).send({user: insertedUser[0]});
        }
      });
    }
  });
});

usersRouter.param('userId', (req, res, next, userId) => {
  const sql = `SELECT * FROM Users WHERE id=${userId}`;
  db.query(sql, function(err, user) {
    if (err) {
      next(err);
    } else if (user[0]) {
      req.userId = userId;
      req.user = user[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});

// GET /api/users/:userId
usersRouter.get('/:userId', (req, res, next) => {
  res.status(200).send({user: req.user});
});

// PUT /api/users/:userId
usersRouter.put('/:userId', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  const sql = 'UPDATE Users SET ' +
              'name= ? , ' +
              'last_name= ? , ' +
              'last_name_2= ? , ' +
              'email= ? , ' +
              'type= ? , ' +
              'birthdate= ? , ' +
              'gender= ? , ' +
              'phone= ? ' +
              `WHERE id=${req.userId}`;
  db.query(sql, req.values[0], function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM Users WHERE id=${req.userId}`, function(err, user) {
        if (err) {
          next(err);
        } else {
          res.send({user: user[0]});
        }
      });
    }
  });
});
*/

module.exports = authRouter;
