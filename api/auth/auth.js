/***** Auth Routes *****/
/*
    POST /api/auth
    POST /api/auth/register
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
  console.log(req.body);

  req.minimumRequestData = [
    'password',
    'email'
  ];

  req.expectedPostData = [
    'password',
    'email'
  ];

  req.expectedUpdateData = [

  ];

  next();
}

/***** User Routes *****/
// GET /api/auth
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

          let displayName = user[0].name;
          if (user[0].last_name !== null) {
            displayName += ' ' + user[0].last_name;
          }
          if (user[0].last_name_2 !== null) {
            displayName += ' ' + user[0].last_name_2;
          }
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

// POST /api/auth/register
authRouter.post('/register', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  let sql = `UPDATE Users SET password="${req.body.data.password}" WHERE email="${req.body.data.email}" `;
  db.query(sql, function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = `SELECT * FROM Users WHERE email="${req.body.data.email}" LIMIT 1`;
      console.log(sql);
      db.query(sql, function(err, user) {
        if (err) {
          next(err);
        } else {
          console.log(user);
          if (user.length > 0) {
            const access_token = jwt.sign({id: user.id}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});

            const response = {
                "user"        : user[0],
                "access_token": access_token
            };

            let displayName = user[0].name;
            if (user[0].last_name !== null) {
              displayName += ' ' + user[0].last_name;
            }
            if (user[0].last_name_2 !== null) {
              displayName += ' ' + user[0].last_name_2;
            }

            //const displayName = user[0].name + ' ' + user[0].last_name + ' ' + user[0].last_name_2;
            response.user.data = {};
            response.user.data['photoURL'] = user[0].profile_img_url;
            response.user.data['displayName'] = displayName;
            response.user.data['email'] = user[0].email;
            response.user.role = user[0].type;

            res.status(201).send(response);
          } else {
            const error = {
                email      : 'Correo no dado de alta',
                password   : null
            };
            res.status(200).send({error});
          }
        }
      });
    }
  });
});
/*
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
