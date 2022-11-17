const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const ErrorLogin = require('../errors/errorlogin');

module.exports.auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const tokenCheck = jwt.verify(token, JWT_SECRET);
    if (!tokenCheck) {
      return next(new ErrorLogin('Что-то пошло не так'));
    }
    req.user = tokenCheck;
    return next();
  } catch (err) {
    return next(new ErrorLogin('Что-то пошло не так'));
  }
};

module.exports.signToken = (id) => {
  try {
    console.log(JWT_SECRET);
    const token = jwt.sign({ _id: id }, JWT_SECRET);
    return token;
  } catch (err) {
    console.log(err);
    return false;
  }
};
