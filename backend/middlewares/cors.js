const allowedCors = [
  'http://localhost:3000', 'http://mestoandyamakasi.nomoredomains.icu', 'https://mestoandyamakasi.nomoredomains.icu', 'http://mestoyamakasib.nomoredo.nomoredomains.icu', 'https://mestoyamakasib.nomoredo.nomoredomains.icu',
];

module.exports.corsCheck = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
