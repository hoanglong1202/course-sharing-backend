const express = require('express');
const { CourseController } = require('../controllers');
const { CourseValidation } = require('../validations');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');

const router = express.Router();

const uploadCoverImage = uploads.fields([
  { name: "cover_picture", maxCount: 1 },
]);

router.get('/', CourseController.getLandingPageCourses);
router.get('/lesson/types', CourseController.getLessonTypes);

router.get('/:id', validate(CourseValidation.getCourseDetail), CourseController.getCourse);
router.get('/course-list/:creatorId', validate(CourseValidation.getCourseList), CourseController.getCourseList);
router.get('/lesson/:courseId', validate(CourseValidation.getLessonList), CourseController.getLessonList);
router.get('/lesson/:courseId/:lessonId', validate(CourseValidation.getLessonDetail), CourseController.getLesson);

router.post('/add-course', uploadCoverImage,  CourseController.addCourse );

module.exports = router;
