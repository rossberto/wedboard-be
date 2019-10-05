/***** Users Routes *****/
/*
    GET /api/users/:userId/details
    POST /api/users/:userId/details
    PUT /api/users/:userId/details
*/
const express = require('express');
const db = require('../../db/database');

// User's Middleware
const mw = require('../middleware');
const getSqlCommand = require('./getSqlCommand');

const userDetailsRouter = express.Router();

// Local Middleware
function setDataRequirements(req, res, next) {
  const type = req.body.type;

  if (req.user.type !== type) {
    res.status(400).send();
  } else {
    const userDetails = req.body.userDetails;

    switch (type) {
      case 'Couple':
        req.minimumRequestData = [];
        req.expectedPostData = [
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
        req.expectedUpdateData = [
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
        req.minimumRequestData = [];
        req.expectedPostData = [
          'jobPosition',
          'emailCc',
          'providerId'
        ];
        req.expectedUpdateData = [
          'jobPosition',
          'emailCc',
          'providerId'
        ];
        break;
      case 'Planner':
        req.minimumRequestData = ['role', 'isCurrentEmployee'];
        req.expectedPostData = [
          'role',
          'isCurrentEmployee'
        ];
        req.expectedUpdateData = [
          'role',
          'isCurrentEmployee'
        ];
        break;
      default:
        res.status(400).send();
    }
    next();
  }
}

/***** User Routes *****/
// GET /api/users/:userId/details
userDetailsRouter.get('/', (req, res, next) => {
  const type = req.user.type;
  const sql = `SELECT * FROM ${type}Users WHERE Users_id=${req.userId} LIMIT 1`;
  db.query(sql, function(err, details) {
    if (err) {
      next(err);
    } else if (details[0]) {
      res.status(200).send({userDetails: details[0]});
    } else {
      res.status(404).send();
    }
  });
});

// POST /api/users/:userId/details
userDetailsRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, getSqlCommand, (req, res, next) => {
  req.values[0].push(req.userId);

  db.query(req.sql, [req.values], function(err, result) {
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

// PUT /api/users/:userId/details
userDetailsRouter.put('/', setDataRequirements, mw.getValues, getSqlCommand, (req, res, next) => {
  db.query(req.sql, req.values[0], function(err, result) {
    if (err) {
      next(err);
    } else {
      const type = req.user.type;
      const sql = `SELECT * FROM ${type}Users WHERE Users_id=${req.userId}  LIMIT 1`;
      db.query(sql, function(err, insertedUserDetails) {
        if (err) {
          next(err);
        } else {
          res.status(200).send({userDetails: insertedUserDetails[0]});
        }
      });
    }
  });
});

module.exports = userDetailsRouter;
