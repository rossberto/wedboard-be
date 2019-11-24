function validatePostRequest(req, res, next) {
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
  let expectedData = [];
  if (req.method === 'POST') {
    expectedData = req.expectedPostData;
  } else if(req.method === 'PUT') {
    expectedData = req.expectedUpdateData;
  }

  let reqData = {};

  expectedData.forEach(data => {
    if (!request[data]) {
      reqData[data] = null;
    } else {
      reqData[data] = request[data];
    }
  });

  const values = Object.values(reqData);
  req.values = [values];

  next();
}

module.exports = {
  validatePostRequest,
  getValues
}
