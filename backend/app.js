const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/auth');
const { userValidateLogin, userValidateRegistration } = require('./Validations/user');
const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');
const { errorHandler } = require('./errors/handler');
const NotFound = require('./errors/notfound');

require('dotenv').config();
const {
  login, register,
} = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'mestoandyamakasi.nomoredomains.icu', 'mestoyamakasib.nomoredo.nomoredomains.icu'],
}));
app.use(requestLogger);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb ', (err) => {
  if (!err) console.log('сервер запущен');
  else console.log('ошибка');
  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });
  app.post('/signin', userValidateLogin, login);
  app.post('/signup', userValidateRegistration, register);
  app.use('/', auth, routesUser);
  app.use('/', auth, routesCard);
  app.use(auth, (req, res, next) => {
    next(new NotFound('Маршрут не найден'));
  });
  app.use(errorLogger);
  app.use(errors());
  app.use('/', errorHandler);
});

app.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});
