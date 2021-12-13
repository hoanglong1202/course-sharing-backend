const Joi = require('joi');

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    user_id: Joi.any().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    profile_picture: Joi.string().required(),
    cover_picture: Joi.any(),
  }),
};

module.exports = { getUser, updateUser };
