const Joi = require('joi');

const register = {
  body: Joi.object().keys({
    username: Joi.string().required().email(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const signin = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  signin,
};
