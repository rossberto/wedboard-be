function validateProject(req, res, next) {
  const project = req.body.project;

  if (project.creationTimestamp && project.name &&
      project.feastDate && project.createdBy)
  {
    next();
  } else {
    res.status(400).send();
  }
}

function getProjectValues(req, res, next) {
  const project = req.body.project;
  let expectedValues = [
    'creationTimestamp',
    'name',
    'feastDate',
    'createdBy',
    'feastLocation',
    'civilCeremonyDate',
    'civilCeremonyLocation',
    'religiousCeremonyDate',
    'religiousCeremonyLocation',
    'customCeremonyDescription',
    'customCeremonyDescription2',
    'customCeremonyDate',
    'customCeremonyLocation',
    'guestsQuantity',
    'pinterestBoardUrl'
  ];

  expectedValues.forEach(value => {
    if (!project[value]) {
      project[value] = null;
    }
  });

  const values = Object.values(project);
  req.values = [values];

  next();
}

function validateprojectDetails(req, res, next) {
  const type = req.body.type;

  if (req.project.type !== type) {
    res.status(400).send();
  } else {
    const projectDetails = req.body.projectDetails;

    switch (type) {
      case 'Couple':
      case 'Provider':
        next();
        break;
      case 'Planner':
        if (projectDetails.role && projectDetails.isCurrentEmployee) {
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

function getprojectDetails(req, res, next) {
  const projectDetails = req.body.projectDetails;
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
    if (!projectDetails[detail]) {
      projectDetails[detail] = null;
    }
  });
  projectDetails.projectId = req.projectId;

  console.log(projectDetails);
  const details = Object.values(projectDetails);
  console.log(details);
  req.details = [details];

  next();
}

function getSqlCommand(req, res, next) {
  if (req.method === 'PUT') {
    switch (req.project.type) {
      case 'Couple':
        req.sql = 'UPDATE Coupleprojects SET ' +
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
                    `WHERE projects_id=${req.projectId}`;
        next();
        break;
      case 'Provider':
        req.sql = 'UPDATE Providerprojects SET ' +
                    'job_position= ? , ' +
                    'email_cc= ? , ' +
                    'Providers_id= ? ' +
                    `WHERE projects_id=${req.projectId}`;
        next();
        break;
      case 'Planner':
        console.log('A punto de asignar sql');
        req.sql = 'UPDATE Plannerprojects SET ' +
                    'role= ? , ' +
                    'is_current_employee= ? ' +
                    `WHERE projects_id=${req.projectId}`;
        next();
        break;
      default:
        res.status(400).send();
    }
  } else {
    switch (req.project.type) {
      case 'Couple':
        req.sql = 'INSERT INTO Coupleprojects (nationality, residence_country, ' +
                  'residence_city, occupation, religion, children, color1, ' +
                  'color2, color3, partner_id, projects_id) ' +
                  'VALUES ?';
        next();
        break;
      case 'Provider':
        req.sql = 'INSERT INTO Providerprojects (job_position, email_cc, Providers_id, projects_id) ' +
                  'VALUES ?';
        next();
        break;
      case 'Planner':
        req.sql = 'INSERT INTO Plannerprojects (role, is_current_employee, projects_id) ' +
                  'VALUES ?';
        next();
        break;
      default:
      }
  }
}

function validateService(req, res, next) {
  const service = req.body.service;

  if (service.wedboardServiceId) {
    next();
  } else {
    res.status(400).send();
  }
}

function getProjectServices(req, res, next) {
  const service = req.body.service;
  let expectedValues = [
    'wedboardServiceId',
    'quantity',
    'comments',
    'comments2'
  ];

  expectedValues.forEach(value => {
    if (!service[value]) {
      service[value] = null;
    }
  });
  service.projectId = req.projectId;

  const values = Object.values(service);
  req.values = [values];

  next();
}

module.exports = {
  validateProject,
  getProjectValues,
  validateprojectDetails,
  getprojectDetails,
  getSqlCommand,
  validateService,
  getProjectServices
}
