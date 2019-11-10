/***** Projects Routes *****/
/*
    GET /api/surveys
    POST /api/surveys
    GET /api/surveys/:projectId
    PUT /api/surveys/:projectId
*/
const express = require('express');
const db = require('../../db/database');

// project's Middleware
//const setDataRequirements = require('./requestRequirements');
const mw = require('../middleware');

const surveysRouter = express.Router();

// Local Middleware
function setDataRequirements(req, res, next) {
  const reqData = {
    Surveys: [
      'last_modification_timestamp', 'status', 'active_step', 'Projects_id'
    ],
    WeddingConceptSection: [
      'answer_1', 'answer_2', 'answer_3', 'answer_4', 'answer_5_food', 'answer_5_drinks',
      'answer_5_decoration', 'answer_5_illumination', 'answer_5_music', 'answer_5_place',
      'answer_5_flowers', 'answer_5_service', 'answer_5_photo', 'answer_5_video',
      'Surveys_id'
    ],
    BudgetSection: [
      'answer_1_budget', 'answer_2', 'answer_3', 'Surveys_id'
    ],
    GuestsSection: [
      'answer_1', 'answer_2_guests_qty', 'answer_3_estimated_attendants', 'Surveys_id'
    ],
    CeremonySection: [
      'answer_1_religious', 'answer_1_legal', 'answer_1_symbolic', 'answer_1_other',
      'answer_2', 'answer_3', 'answer_4', 'answer_5', 'answer_6', 'answer_7',
      'answer_8', 'Surveys_id'
    ],
    WeddingDaySection: [
      'answer_1', 'answer_2', 'answer_3', 'answer_4', 'answer_5', 'answer_6', 'answer_7',
      'answer_8_people_qty', 'answer_9', 'Surveys_id'
    ],
    AmbientSection: [
      'answer_1', 'answer_2', 'answer_3', 'answer_4', 'answer_5', 'Surveys_id'
    ],
    EntertainmentSection: [
      'answer_1', 'answer_2', 'answer_3', 'answer_4', 'Surveys_id'
    ],
    FinalSection: [
      'answer_1', 'answer_2', 'Surveys_id'
    ]
  }

  req.minimumRequestData = reqData[req.body.section];
  req.expectedPostData = reqData[req.body.section];
  reqData[req.body.section].pop(); // We take out the id from request requirements
  req.expectedUpdateData = reqData[req.body.section];

  next();
}

function validateSection(req, res, next) {
  const section = req.body.section;
  console.log('La seccion solicitada es: ' + section);

  if (section) {
    switch (section) {
      case 'Surveys':
      case 'WeddingConceptSection':
      case 'BudgetSection':
      case 'GuestsSection':
      case 'CeremonySection':
      case 'WeddingDaySection':
      case 'AmbientSection':
      case 'EntertainmentSection':
      case 'FinalSection':
        next();
        break;
      default:
        res.status(401).send();
    }
  } else {
    res.status(400).send();
  }
}

/***** project Routes *****/

// GET /api/surveys
surveysRouter.get('/', (req, res, next) => {
  const sql = 'SELECT * FROM Surveys';
  db.query(sql, function(err, surveys) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(surveys);
    }
  });
});

// POST /api/surveys
surveysRouter.post('/',validateSection, setDataRequirements, mw.validatePostRequest, (req, res, next) => {
  db.query(`INSERT INTO ${req.body.section} SET ?`, req.body.data, function(err, result) { //[req.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = `SELECT * FROM ${req.body.section} WHERE id= ? LIMIT 1`;
      db.query(sql, [result.insertId], function(err, insertedSection) {
        if (err) {
          next(err);
        } else {
          res.status(201).send(insertedSection[0]);
        }
      });
    }
  });
});

// POST /api/surveys
surveysRouter.post('/',validateSection, setDataRequirements, mw.validatePostRequest, (req, res, next) => {
  db.query(`INSERT INTO ${req.body.section} SET ?`, req.body.data, function(err, result) { //[req.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = `SELECT * FROM ${req.body.section} WHERE id= ? LIMIT 1`;
      db.query(sql, [result.insertId], function(err, insertedSection) {
        if (err) {
          next(err);
        } else {
          res.status(201).send(insertedSection[0]);
        }
      });
    }
  });
});

surveysRouter.param('surveyId', (req, res, next, surveyId) => {
  const sql = `SELECT * FROM Surveys WHERE id=${surveyId} LIMIT 1`;
  db.query(sql, function(err, survey) {
    if (err) {
      next(err);
    } else if (survey[0]) {
      req.surveyId = surveyId;
      req.survey = survey[0];
      next();
    } else {
      res.status(404).send();
    }
  });
});

// GET /api/surveys/:surveyId
surveysRouter.get('/:surveyId', (req, res, next) => {
  res.status(200).send(req.survey);
});

// PUT /api/surveys
surveysRouter.put('/',validateSection, setDataRequirements, mw.validatePostRequest, (req, res, next) => {
  db.query(`UPDATE ${req.body.section} SET ?`, req.body.data, function(err, result) { //[req.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = `SELECT * FROM ${req.body.section} WHERE id= ? LIMIT 1`;
      db.query(sql, [result.insertId], function(err, insertedSection) {
        if (err) {
          next(err);
        } else {
          res.status(201).send(insertedSection[0]);
        }
      });
    }
  });
});

/*


// PUT /api/surveys/:projectId
surveysRouter.put('/:projectId', setDataRequirements, mw.getValues, (req, res, next) => {
  const sql = 'UPDATE Projects SET ' +
              'name= ? , ' +
              'feast_date= ? , ' +
              'feast_location= ? , ' +
              'civil_ceremony_date= ? , ' +
              'civil_ceremony_location= ? , ' +
              'religious_ceremony_date= ? , ' +
              'religious_location= ? , ' +
              'custom_ceremony_description= ? , ' +
              'custom_ceremony_description_2= ? , ' +
              'custom_ceremony_date= ? , ' +
              'custom_ceremony_location= ? , ' +
              'guests_quantity= ? , ' +
              'pinterest_board_url= ? ' +
              `WHERE id=${req.projectId}`;

  const values = req.values[0];

  db.query(sql, values, function(err) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM Projects WHERE id=${req.projectId}`, function(err, project) {
        if (err) {
          next(err);
        } else {
          res.send({project: project[0]});
        }
      });
    }
  });
});

const projectServicesRouter = require('./projectServices.js');
surveysRouter.use('/:projectId/services', projectServicesRouter);

const ordersRouter = require('../orders/orders');
surveysRouter.use('/:projectId/orders', ordersRouter);

const projectUsersRouter = require('./projectUsers');
surveysRouter.use('/:projectId/users', projectUsersRouter);
*/
module.exports = surveysRouter;
