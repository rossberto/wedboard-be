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
                    'color3= ? , ' +
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

module.exports = getSqlCommand;
