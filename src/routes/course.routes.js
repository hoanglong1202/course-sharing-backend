const express = require('express');
const { CourseController } = require('../controllers');
const { CourseValidation } = require('../validations');
const CreatorAuthenciation = require('../middlewares/creator.authenciation');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');
const UserAuthenciation = require('../middlewares/user.authenciation');

const router = express.Router();

const uploadCoverImage = uploads.fields([
  { name: "profile_picture", maxCount: 1 },
]);

// ======================= LESSON REALATE ROUTES ===================================
router.post('/lesson', CreatorAuthenciation, validate(CourseValidation.addSingleLesson), CourseController.addSingleLesson);
router.get('/lesson/types', CourseController.getLessonTypes);
router.post('/lesson/comment', validate(CourseValidation.addLessonComment), CourseController.addLessonComment);
router.get('/lesson/comment/:courseId/:lessonId', validate(CourseValidation.getLessonComment), CourseController.getLessonComment);
router.get('/lesson/:courseId', validate(CourseValidation.getLessonList), CourseController.getLessonList);
router.get('/lesson/:courseId/:lessonId', validate(CourseValidation.getLessonDetail), CourseController.getLesson);
router.put('/lesson/:courseId/:lessonId', CreatorAuthenciation, validate(CourseValidation.updateLesson), CourseController.updateLesson);
router.delete('/lesson/:courseId/:lessonId', CreatorAuthenciation, validate(CourseValidation.deleteLesson), CourseController.deleteLesson);
router.get('/lesson-history/:courseId/:userId', UserAuthenciation, validate(CourseValidation.getUserLessonHistory), CourseController.getUserLessonHistory);

// ======================= COURSE REALATE ROUTES ===================================
router.get('/', CourseController.getLandingPageCourses);
router.get('/types', CourseController.getCourseTypes);
router.get('/search', CourseController.searchCourse);
router.post('/add-course', CreatorAuthenciation, uploadCoverImage, validate(CourseValidation.addCourse), CourseController.addCourse);
router.put('/update-course', CreatorAuthenciation, uploadCoverImage, validate(CourseValidation.updateCourse), CourseController.updateCourse);
router.delete('/delete-course/:id', CreatorAuthenciation, validate(CourseValidation.deleteCourse), CourseController.deleteCourse);
router.get('/course-list/:creatorId', CreatorAuthenciation, validate(CourseValidation.getCourseList), CourseController.getCourseList);
router.get('/count-view/:id', validate(CourseValidation.countCourseViewed), CourseController.countCourseViewed);
router.get('/rating/:id', validate(CourseValidation.getCourseRating), CourseController.getCourseRating);
router.post('/rating', UserAuthenciation, validate(CourseValidation.addCourseRating), CourseController.addCourseRating);

router.get('/course-register/:courseId', validate(CourseValidation.getCourseRegister), CourseController.getCourseRegister);
router.post('/course-register/:courseId/:userId', UserAuthenciation, validate(CourseValidation.addCourseRegister), CourseController.addCourseRegister);

router.get('/:id', validate(CourseValidation.getCourseDetail), CourseController.getCourse);

module.exports = router;
