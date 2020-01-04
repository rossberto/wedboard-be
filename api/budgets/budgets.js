/***** Budgets Routes *****/
/*
    GET /api/budgets
*/
const express = require('express');
const db = require('../../db/database');

// budgets's Middleware
const mw = require('../middleware');

const budgetsRouter = express.Router();


/***** project Routes *****/

// GET /api/budgets
budgetsRouter.get('/', (req, res, next) => {
  let sql = 'SELECT Projects.id, name, total_budget, BudgetDistribution.* FROM Projects JOIN ProjectBalance ON Projects.id=ProjectBalance.Projects_id JOIN BudgetDistribution ON ProjectBalance.BudgetDistribution_id=BudgetDistribution.id';
  db.query(sql, function(err, projects) {
    if (err) {
      next(err);
    } else {
      if (projects.length > 0) {
        sql = '';
        for (let i=0; i<projects.length; i++) {
          sql += `SELECT Users_id, name, type FROM ProjectUsers JOIN Users ON ProjectUsers.Users_id=Users.id WHERE Projects_id=${projects[i].id} AND type='Couple'; `;
        }

        db.query(sql, function(err, results) {
          if (err) {
            next(err);
          } else {
            if (results[0][0]) {
              projects.forEach((project, index) => {
                project.couple = results[index];
              });
            } else {
              projects[0].couple = results;
            }
            res.status(200).send(projects);
          }
        });
      } else {
        res.status(200).send(projects);
      }
    }
  });
});

module.exports = budgetsRouter;
