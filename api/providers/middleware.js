/***** Provider Middleware *****/
function validateProvider(req, res, next) {
  const provider = req.body.provider;

  if (provider.name  && provider.country &&
      provider.state && provider.city)
  {
    next();
  } else {
    res.status(400).send();
  }
}

function getProviderValues(req, res, next) {
  const provider = req.body.provider;
  let expectedValues = [
    'name',
    'isActive',
    'country',
    'state',
    'city',
    'joinDate',
    'zipCode',
    'address',
    'addressOptional',
    'phone',
    'webPage'
  ];

  expectedValues.forEach(value => {
    if (!provider[value]) {
      provider[value] = null;
    }
  });

  const values = Object.values(provider);
  req.values = [values];

  next();
}

/***** Provider Service Middleware *****/

function validateProviderService(req, res, next) {
  const service = req.body.service;

  if (service.name  && service.description && service.minRange &&
      service.maxRange && service.rangeUnit && service.price)
  {
    next();
  } else {
    res.status(400).send();
  }
}

function getProviderServiceValues(req, res, next) {
  const provider = req.body.provider;
  const expectedValues = [
    'name',
    'description',
    'description_optional',
    'minRange',
    'maxRange',
    'rangeUnit',
    'price',
    'providerServiceCode',
    'Providers_id',
    'WedboardServices_id'
  ];

  expectedValues.forEach(value => {
    if (!provider[value]) {
      provider[value] = null;
    }
  });

  const values = Object.values(provider);
  req.values = [values];

  next();
}

module.exports = {
  validateProvider,
  getProviderValues
}
