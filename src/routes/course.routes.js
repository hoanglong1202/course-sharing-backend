const express = require('express');
const { CourseController } = require('../controllers');
const { CourseValidation } = require('../validations');
const validate = require('../middlewares/validate');
const router = express.Router();

router.get('/', CourseController.getLandingPageCourses);
router.get('/:id', validate(CourseValidation.getCourseDetail), CourseController.getCourse);
router.get('/lesson/:courseId/:lessonId', validate(CourseValidation.getLessonDetail), CourseController.getLesson);
router.get('/lesson/:courseId', validate(CourseValidation.getLessonList), CourseController.getLessonList);

module.exports = router;
