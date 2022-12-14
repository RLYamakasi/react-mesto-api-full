const allowedCors = [
  'http://localhost:3000', 'http://mestoandyamakasi.nomoredomains.icu', 'https://mestoandyamakasi.nomoredomains.icu', 'http://mestoyamakasib.nomoredo.nomoredomains.icu', 'https://mestoyamakasib.nomoredo.nomoredomains.icu',
];

module.exports.corsCheck = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  // const reqHeaders = req.headers['access-control-request-headers'];
  // const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE, PATCH');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE, PATCH');
    return res.end();
  }

  return next();
};
