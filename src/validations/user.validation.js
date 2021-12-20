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

const addUserFavourite = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

const removeUserFavourite = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

const getUserFavourite = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

const getUserHistoryList = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const addUserHistory = {
  body: Joi.object().keys({
    courseId: Joi.number().required(),
    lessonId: Joi.number().required(),
    userId: Joi.number().required(),
  }),
};

module.exports = {
  getUser,
  updateUser,
  addUserFavourite,
  getUserFavourite,
  removeUserFavourite,
  addUserHistory,
  getUserHistoryList,
};
