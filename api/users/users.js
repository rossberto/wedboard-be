const express = require('express');
const db = require('../../db/database');

const usersRouter = express.Router();

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
  let expectedValues = [
    'name',
    'lastName',
    'lastName2',
    'email',
    'type',
    'joinDate',
    'birthdate',
    'gender',
    'phone',
    'token',
    'isOnline',
    'isForbidden'
  ];

  expectedValues.forEach(value => {
    if (!user[value]) {
      user[value] = null;
    }
  });

  const values = Object.values(user);
  console.log(values);
  req.values = [values];
/*
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
*/
  next();
}

function validateUserDetails(req, res, next) {
  const type = req.body.type;

  if (req.user.type !== type) {
    res.status(400).send();
  } else {
    const userDetails = req.body.userDetails;

    switch (type) {
      case 'Couple':
      case 'Provider':
        next();
        break;
      case 'Planner':
        if (userDetails.role) {
          next();
        } else {
          res.status(400).send();
        }
        break;
      default:
        res.status(400).send();
    }
  }
}

function getUserDetails(req, res, next) {
  const userDetails = req.body.userDetails;
  let expectedDetails = [];

  switch (req.body.type) {
    case 'Couple':
      req.sql = 'INSERT INTO CoupleUsers (nationality, residence_country, ' +
                'residence_city, occupation, religion, children, color1, ' +
                'color2, color3, partner_id, Users_id) ' +
                'VALUES ?';
      expectedDetails = [
        'nationality',
        'residenceCountry',
        'residenceCity',
        'occupation',
        'religion',
        'children',
        'color1',
        'color2',
        'color3',
        'partnerId'
      ];
      break;
    case 'Provider':
      req.sql = 'INSERT INTO ProviderUsers (job_position, email_cc, Providers_id, Users_id) ' +
                'VALUES ?';
      expectedDetails = [
        'jobPosition',
        'emailCc',
        'providerId'
      ];
      break;
    case 'Planner':
      req.sql = 'INSERT INTO PlannerUsers (role, is_current_employee, Users_id) ' +
                'VALUES ?';
      expectedDetails = [
        'role',
        'isCurrentEmployee'
      ];
      break;
    default:
      res.status(400).send();
  }

  expectedDetails.forEach(detail => {
    if (!userDetails[detail]) {
      userDetails[detail] = null;
    }
  });
  userDetails.userId = req.userId;

  const details = Object.values(userDetails);
  console.log(details);
  req.details = [details];

  next();
}
/***** End of Auxiliar Functions *****/

/***** User Routes *****/
usersRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM Users';
  db.query(sql, function(err, users) {
    if (err) {
      next(err);
    } else {
      res.status(200).send({users: users});
    }
  });
});

usersRouter.post('/', validateUser, getUserValues, (req, res, next) => {
  let sql = 'INSERT INTO Users (name, last_name, last_name_2, email, ' +
            'type, join_date, birthdate, gender, phone, ' +
            'token, is_online, is_forbidden) VALUES ?';
  db.query(sql, [req.values], function(err, result, fields) {
    if (err) {
      next(err);
      //break;
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

usersRouter.get('/:userId', (req, res, next) => {
  res.status(200).send({user: req.user});
});

usersRouter.put('/:userId', validateUser, getUserValues, (req, res, next) => {
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

usersRouter.delete('/:userId', (req, res, next) => {
  const sql = 'UPDATE Users ' +
              'SET is_forbidden=1 ' +
              `WHERE id=${req.userId}`;
  db.query(sql, function(err) {
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

usersRouter.get('/:userId/details', (req, res, next) => {
  const type = req.user.type;
  const sql = `SELECT * FROM ${type}Users WHERE Users_id=${req.userId}`;
  db.query(sql, function(err, details) {
    if (err) {
      next(err);
    } else if (details[0]) {
      res.status(200).send({user: details[0]});
    } else {
      res.status(404).send();
    }
  });
});

usersRouter.post('/:userId/details', validateUserDetails, getUserDetails, (req, res, next) => {
  db.query(req.sql, [req.details], function(err, result) {
    if (err) {
      next(err);
    } else {
      const type = req.user.type;
      const sql = `SELECT * FROM ${type}Users WHERE id= ? LIMIT 1`;
      db.query(sql, [result.insertId], function(err, insertedUserDetails) {
        if (err) {
          next(err);
        } else {
          res.status(201).send({userDetails: insertedUserDetails[0]});
        }
      });
    }
  });
});

module.exports = usersRouter;
