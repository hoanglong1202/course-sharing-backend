const Joi = require('joi');

const getCourseDetail = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const getLessonList = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
  }),
};

const getLessonDetail = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
    lessonId: Joi.string().required(),
  }),
};

const getCourseList = {
  params: Joi.object().keys({
    creatorId: Joi.string().required(),
  }),
};

const addCourse = {
  body: Joi.object().keys({
    course_name: Joi.string().required(),
    description: Joi.string().required(),
    cover_picture: Joi.string().required(),
    lesson: Joi.string().required(),
    creator_id: Joi.any().required(),
    max_user: Joi.any().required(),
    profile_picture: Joi.any().required(),
  }),
};

const updateCourse = {
  body: Joi.object().keys({
    course_name: Joi.string().required(),
    description: Joi.string().required(),
    cover_picture: Joi.string().required(),
    creator_id: Joi.any().required(),
    max_user: Joi.any().required(),
    profile_picture: Joi.any().required(),
    id: Joi.any().required(),
  }),
};

module.exports = {
  getCourseDetail,
  getLessonList,
  getLessonDetail,
  getCourseList,
  addCourse,
  updateCourse,
};
