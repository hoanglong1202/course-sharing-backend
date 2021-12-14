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

const addCreator = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    description: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    profile_picture: Joi.string().required(),
    cover_picture: Joi.any(),
  }),
};

module.exports = { removeUser, removeCreator, addCreator };
