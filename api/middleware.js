function validateRequest(req, res, next) {
  const request = req.body.data;
  const minimumData = req.minimumRequestData;

  const valid = minimumData.every(data => {
    return request.hasOwnProperty(data);
  });

  if (valid)
  {
    next();
  } else {
    res.status(400).send();
  }
}

function getValues(req, res, next) {
  const request = req.body.data;
  const expectedData = req.expectedData;

  expectedData.forEach(data => {
    if (!request[data]) {
      request[data] = null;
    }
  });

  const values = Object.values(request);
  req.values = [values];

  next();
}

module.exports = {
  validateRequest,
  getValues
}
