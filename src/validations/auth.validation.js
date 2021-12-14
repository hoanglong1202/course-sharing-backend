const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    profile_picture: Joi.string(),
    cover_picture: Joi.any(),
  }),
};

const signin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  signin,
};
