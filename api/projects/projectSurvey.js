/***** Project Users Routes *****/
/*
    GET /api/projects/:projectId/survey
    POST /api/projects/:projectId/survey
*/
const express = require('express');
const db = require('../../db/database');

// project's Middleware
const mw = require('../middleware');

const projectSurveyRouter = express.Router();

/***** Project's Survey Routes *****/

// GET /api/projects/:projectId/survey
projectSurveyRouter.get('/', (req, res, next) => {
  const sql = `SELECT * FROM Surveys WHERE Projects_id=${req.projectId} LIMIT 1`;
  db.query(sql, function(err, survey) {
    if (err) {
      next(err);
    } else if (survey.length > 0) {
      req.surveyId = survey[0].id;
      req.survey = survey[0];

      if (survey[0].active_step > 0) {
        const sections = [
          'WeddingConceptSection', 'BudgetSection', 'GuestsSection', 'CeremonySection',
          'WeddingDaySection', 'AmbientSection', 'EntertainmentSection', 'FinalSection'
        ];

        let sectionsSql = '';
        for (let i=0; i<req.survey.active_step; i++) {
          sectionsSql += `SELECT * FROM ${sections[i]} WHERE Surveys_id=${req.surveyId}; `
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
            res.status(200).send(req.survey);
          }
        });
      } else {
        res.status(200).send(req.survey);
      }
    } else {
      res.status(404).send();
    }
  });
});

// POST /api/projects/:projectId/survey
projectSurveyRouter.post('/', (req, res, next) => {
  console.log('En POST Survey');
  const sql = `INSERT INTO Surveys (Projects_id, status, active_step) VALUES (${req.projectId}, "${'Creado'}", 1)`;
  db.query(sql, function(err, result) {
    if (err) {
      next(err);
    } else {
      const surveyId = result.insertId;

      res.status(201).send({surveyId: result.insertId});
    }
  });
});

module.exports = projectSurveyRouter;
