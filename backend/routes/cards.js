const { celebrate, Joi, Segments } = require('celebrate');
const router = require('express').Router();
const {
  findCards, postCard, deleteCard, setLikeToCard, deleteLikeFromCard,
} = require('../controllers/cards');
const { cardValidate } = require('../Validations/cards');

module.exports = router;

router.get('/api/cards', findCards);
router.post('/api/cards', cardValidate, postCard);
router.delete('/api/cards/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);
router.put('/api/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), setLikeToCard);
router.delete('/api/cards/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteLikeFromCard);
