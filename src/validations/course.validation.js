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
    profile_picture: Joi.any(),
    types_id: Joi.any().required(),
  }),
};

const updateCourse = {
  body: Joi.object().keys({
    course_name: Joi.string().required(),
    description: Joi.string().required(),
    cover_picture: Joi.string().required(),
    creator_id: Joi.any().required(),
    max_user: Joi.any().required(),
    profile_picture: Joi.any(),
    id: Joi.any().required(),
    types_id: Joi.any().required(),
  }),
};

const deleteCourse = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const deleteLesson = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
    lessonId: Joi.string().required(),
  }),
};

const updateLesson = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
    lessonId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    lesson_name: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
    lesson_types_id: Joi.any().required(),
  }),
};

const countCourseViewed = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const getCourseRating = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const addCourseRating = {
  body: Joi.object().keys({
    courseId: Joi.any().required(),
    userId: Joi.any().required(),
    content: Joi.string().required(),
    point: Joi.any().required(),
  }),
};

const getLessonComment = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
    lessonId: Joi.string().required(),
  }),
};

const addLessonComment = {
  body: Joi.object().keys({
    courseId: Joi.number().required(),
    lessonId: Joi.number().required(),
    username: Joi.string().required(),
    isCreator: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const addSingleLesson = {
  body: Joi.object().keys({
    courseId: Joi.number().required(),
    lesson_name: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
    lesson_types_id: Joi.any().required(),
  }),
};

const getCourseRegister = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
  }),
};

const addCourseRegister = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

const getUserLessonHistory = {
  params: Joi.object().keys({
    courseId: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

module.exports = {
  getCourseDetail,
  getLessonList,
  getLessonDetail,
  getCourseList,
  addCourse,
  updateCourse,
  deleteCourse,
  deleteLesson,
  updateLesson,
  countCourseViewed,
  getCourseRating,
  addCourseRating,
  getLessonComment,
  addLessonComment,
  addSingleLesson,
  getCourseRegister,
  addCourseRegister,
  getUserLessonHistory,
};
