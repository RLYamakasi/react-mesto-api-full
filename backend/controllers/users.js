const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const BadRequestError = require('../errors/badreq');
const AuthError = require('../errors/autherror');
const NotFound = require('../errors/notfound');
const ErrorLogin = require('../errors/errorlogin');
const { signToken } = require('../middlewares/auth');

module.exports.findUsers = (req, res, next) => {
  Users.find({})
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.aboutMe = (req, res, next) => {
  Users.findOne({ _id: req.user._id })
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new ErrorLogin('Неверный логин или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new ErrorLogin('Неправильные почта или пароль'));
          }
          const result = signToken(user._id);
          if (!result) {
            return next(new ErrorLogin('Ошибка создания токена'));
          }
          return res.status(200).send({ data: result });
        });
    })
    .catch(next);
};

module.exports.register = (req, res, next) => {
  const {
    name, avatar, about, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      email,
      password: hash,
      name,
      avatar,
      about,
    }))
    .then(() => res.send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.send(err);
        return next(new BadRequestError('Что-то пошло не так'));
      }
      if (err.code === 11000) {
        return next(new AuthError('Email зарегистрирован'));
      }
      return next(err);
      // здесь нельзя поставить else, потому что linter будет ругаться
    });
};

module.exports.getUserById = (req, res, next) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      return res.status(200).send({ user });
    })
    .catch(next);
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Что-то пошло не так'));
      } else {
        next(err);
      }
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Что-то пошло не так'));
      } else {
        next(err);
      }
    });
};
