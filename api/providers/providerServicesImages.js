const express = require('express');
const db = require('../../db/database');

// User's Middleware
const mw = require('../middleware');

const providerServicesImagesRouter = express.Router();

// Local middleware
function setDataRequirements(req, res, next) {
  req.minimumRequestData = [
    'image_url',
    'alt'
  ];

  req.expectedPostData = [
    'image_url',
    'alt'
  ];

  req.expectedUpdateData = [
    'image_url',
    'alt'
  ];

  next();
}

// Get all services of a given provider
// GET /api/providers/:providerId/services/:serviceId/images
providerServicesImagesRouter.get('/', (req, res, next) => {
  let sql = `SELECT * FROM ProviderServicesImages WHERE ProviderServices_id=${req.serviceId}`;
  db.query(sql, function(err, images) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(images);
    }
  });
});

// POST /api/providers/:providerId/services/:serviceId/images
providerServicesImagesRouter.post('/', setDataRequirements, mw.validatePostRequest, mw.getValues, (req, res, next) => {
  req.values[0].push(req.serviceId);
  console.log(req.values);
  const sql = 'INSERT INTO ProviderServicesImages (image_url, alt, ProviderServices_id) ' +
              `VALUES ?`;
  db.query(sql, [req.values], function(err, result) {
    if (err) {
      next(err);
    } else {
      db.query(`SELECT * FROM ProviderServicesImages WHERE id=${result.insertId}`, function(err, image) {
        if (err) {
          next(err);
        } else {
          res.status(201).send(image[0]);
        }
      });
    }
  });
});

module.exports = providerServicesImagesRouter;
