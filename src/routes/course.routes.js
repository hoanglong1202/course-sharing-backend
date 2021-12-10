const express = require('express');
const { CourseController } = require('../controllers');
const { CourseValidation } = require('../validations');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');

const router = express.Router();

const uploadCoverImage = uploads.fields([
  { name: "profile_picture", maxCount: 1 },
]);

router.get('/', CourseController.getLandingPageCourses);
router.get('/types', CourseController.getCourseTypes);
router.get('/search', CourseController.searchCourse);
router.get('/course-list/:creatorId', validate(CourseValidation.getCourseList), CourseController.getCourseList);
router.get('/:id', validate(CourseValidation.getCourseDetail), CourseController.getCourse);

router.get('/lesson/types', CourseController.getLessonTypes);
router.get('/lesson/:courseId', validate(CourseValidation.getLessonList), CourseController.getLessonList);
router.get('/lesson/:courseId/:lessonId', validate(CourseValidation.getLessonDetail), CourseController.getLesson);
router.put('/lesson/:courseId/:lessonId', validate(CourseValidation.updateLesson), CourseController.updateLesson);
router.delete('/lesson/:courseId/:lessonId', validate(CourseValidation.deleteLesson), CourseController.deleteLesson);

router.post('/add-course', uploadCoverImage, validate(CourseValidation.addCourse), CourseController.addCourse);
router.put('/update-course', uploadCoverImage, validate(CourseValidation.updateCourse), CourseController.updateCourse);
router.delete('/delete-course/:id', uploadCoverImage, validate(CourseValidation.deleteCourse), CourseController.deleteCourse);

module.exports = router;
