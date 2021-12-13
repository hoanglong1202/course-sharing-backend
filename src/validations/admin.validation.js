const Joi = require('joi');

const removeUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const removeCreator = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = { removeUser, removeCreator };
