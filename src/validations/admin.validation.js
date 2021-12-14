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

const approvedCourse = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const removeCourseType = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const addCourseType = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const updateCourseType = {
  body: Joi.object().keys({
    id: Joi.any().required(),
    name: Joi.string().required(),
  }),
};

module.exports = {
  removeUser,
  removeCreator,
  addCreator,
  approvedCourse,
  removeCourseType,
  addCourseType,
  updateCourseType,
};
