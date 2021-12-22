const Joi = require('joi');

const removeUser = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const getAdmin = {
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

const updateAdmin = {
  body: Joi.object().keys({
    admin_id: Joi.any().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    profile_picture: Joi.string().required(),
    cover_picture: Joi.any(),
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
  getAdmin,
  updateAdmin,
};
