const Joi = require('joi');

const updateCreator = {
  body: Joi.object().keys({
    creator_id: Joi.any().required(),
    email: Joi.string().required(),
    description: Joi.string().required(),
    username: Joi.string().required(),
    profile_picture: Joi.string().required(),
    cover_picture: Joi.any(),
  }),
};

module.exports = { updateCreator };
