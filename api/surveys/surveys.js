/***** Projects Routes *****/
/*
    GET /api/surveys
    POST /api/surveys
    GET /api/surveys/:surveyId
    PUT /api/surveys/:surveyId
*/
const express = require('express');
const db = require('../../db/database');
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
  reqData[req.body.section].pop(); // Take out the id from request requirements
  req.expectedUpdateData = reqData[req.body.section];

  next();
}

function validateSection(req, res, next) {
  const section = req.body.section;

  if (section) {
    switch (section) {
      case 'Surveys':
        req.sectionIdColumn = 'id';
        next();
        break;
      case 'WeddingConceptSection':
      case 'BudgetSection':
      case 'GuestsSection':
      case 'CeremonySection':
      case 'WeddingDaySection':
      case 'AmbientSection':
      case 'EntertainmentSection':
      case 'FinalSection':
        req.sectionIdColumn = 'Surveys_id';
        next();
        break;
      default:
        res.status(400).send();
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

// POST /api/surveys/
surveysRouter.post('/',validateSection, setDataRequirements, mw.validatePostRequest, (req, res, next) => {
  db.query(`INSERT INTO ${req.body.section} SET ?`, req.body.data, function(err, result) {
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
    } else if (survey.length > 0) {
      req.surveyId = surveyId;
      req.survey = survey[0];

      const sections = [
        'WeddingConceptSection', 'BudgetSection', 'GuestsSection', 'CeremonySection',
        'WeddingDaySection', 'AmbientSection', 'EntertainmentSection', 'FinalSection'
      ];

      let sectionsSql = '';
      for (let i=0; i<req.survey.active_step; i++) {
        sectionsSql += `SELECT * FROM ${sections[i]} WHERE Surveys_id=${surveyId}; `
      }

      db.query(sectionsSql, function(err, results) {
        if (err) {
          next(err);
        } else {
          for (let i=0; i<req.survey.active_step; i++) {
            if (results.length > 1) {
              req.survey[sections[i]] = results[i][0];
            } else {
              req.survey[sections[i]] = results[0];
            }
          }
          next();
        }
      });
    } else {
      res.status(404).send();
    }
  });
});

// GET /api/surveys/:surveyId
surveysRouter.get('/:surveyId', (req, res, next) => {
  res.status(200).send(req.survey);
});

// POST /api/surveys/:surveyId
surveysRouter.post('/:surveyId', validateSection, setDataRequirements, mw.validatePostRequest, (req, res, next) => {
  delete req.body.data.id;  // id will be generated with autoincrement
  req.body.data.Surveys_id = req.surveyId;

  const sql = `INSERT INTO ${req.body.section} SET ?`
  db.query(sql, req.body.data, function(err, insertedSection) {
    if (err) {
      next(err);
    } else {
      res.status(201).send(insertedSection[0]);
    }
  });
});

// PUT /api/surveys/:surveyId
surveysRouter.put('/:surveyId',validateSection, setDataRequirements, mw.validatePostRequest, (req, res, next) => {
  db.query(`UPDATE ${req.body.section} SET ? WHERE ${req.sectionIdColumn}=${req.surveyId}`, req.body.data, function(err, result) {
    if (err) {
      next(err);
    } else {
      sql = `SELECT * FROM ${req.body.section} WHERE ${req.sectionIdColumn}=${req.surveyId} LIMIT 1`;
      db.query(sql, [result.insertId], function(err, insertedSection) {
        if (err) {
          next(err);
        } else {
          res.status(200).send(insertedSection[0]);
        }
      });
    }
  });
});

module.exports = surveysRouter;
