require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const ErrorLogin = require('../errors/errorlogin');

module.exports.auth = (req, res, next) => {
  const cookie = req.cookies.token;
  try {
    const tokenCheck = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b');
    if (!tokenCheck) {
      return next(new ErrorLogin('Что-то пошло не так'));
    }
    req.user = tokenCheck;
    return next();
  } catch (err) {
    return next(new ErrorLogin('Что-то пошло не так'));
  }
};
