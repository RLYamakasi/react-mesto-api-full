require('dotenv').config();

const jwt = require('jsonwebtoken');
const ErrorLogin = require('../errors/errorlogin');

module.exports.auth = (req, res, next) => {
  const cookie = req.cookies.token;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    const tokenCheck = jwt.verify(cookie, NODE_ENV === 'devolepment' ? JWT_SECRET : 'supersecretkey');
    if (!tokenCheck) {
      return next(new ErrorLogin('Что-то пошло не так'));
    }
    req.user = tokenCheck;
    return next();
  } catch (err) {
    return next(new ErrorLogin('Что-то пошло не так'));
  }
};
