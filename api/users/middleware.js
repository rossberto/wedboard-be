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
        if (userDetails.role && userDetails.isCurrentEmployee) {
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
      expectedDetails = [
        'jobPosition',
        'emailCc',
        'providerId'
      ];
      break;
    case 'Planner':
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

  console.log(userDetails);
  const details = Object.values(userDetails);
  console.log(details);
  req.details = [details];

  next();
}

function getSqlCommand(req, res, next) {
  if (req.method === 'PUT') {
    switch (req.user.type) {
      case 'Couple':
        req.sql = 'UPDATE CoupleUsers SET ' +
                    'nationality= ? , ' +
                    'residence_country= ? , ' +
                    'residence_city= ? , ' +
                    'occupation= ? , ' +
                    'religion= ? , ' +
                    'children= ? , ' +
                    'color1= ? , ' +
                    'color2= ? , ' +
                    'color3= ? ' +
                    'partner_id= ? ' +
                    `WHERE Users_id=${req.userId}`;
        next();
        break;
      case 'Provider':
        req.sql = 'UPDATE ProviderUsers SET ' +
                    'job_position= ? , ' +
                    'email_cc= ? , ' +
                    'Providers_id= ? ' +
                    `WHERE Users_id=${req.userId}`;
        next();
        break;
      case 'Planner':
        console.log('A punto de asignar sql');
        req.sql = 'UPDATE PlannerUsers SET ' +
                    'role= ? , ' +
                    'is_current_employee= ? ' +
                    `WHERE Users_id=${req.userId}`;
        next();
        break;
      default:
        res.status(400).send();
    }
  } else {
    switch (req.user.type) {
      case 'Couple':
        req.sql = 'INSERT INTO CoupleUsers (nationality, residence_country, ' +
                  'residence_city, occupation, religion, children, color1, ' +
                  'color2, color3, partner_id, Users_id) ' +
                  'VALUES ?';
        next();
        break;
      case 'Provider':
        req.sql = 'INSERT INTO ProviderUsers (job_position, email_cc, Providers_id, Users_id) ' +
                  'VALUES ?';
        next();
        break;
      case 'Planner':
        req.sql = 'INSERT INTO PlannerUsers (role, is_current_employee, Users_id) ' +
                  'VALUES ?';
        next();
        break;
      default:
      }
  }
}

module.exports = {
  validateUser,
  getUserValues,
  validateUserDetails,
  getUserDetails,
  getSqlCommand
}
