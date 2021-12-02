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

module.exports = {
  getCourseDetail,
  getLessonList,
  getLessonDetail,
};
