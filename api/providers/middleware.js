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

module.exports = {
  validateProvider,
  getProviderValues
}
