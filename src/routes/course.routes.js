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

// ======================= COURSE REALATE ROUTES ===================================
router.post('/add-course', CreatorAuthenciation, uploadCoverImage, validate(CourseValidation.addCourse), CourseController.addCourse);
router.put('/update-course', CreatorAuthenciation, uploadCoverImage, validate(CourseValidation.updateCourse), CourseController.updateCourse);
router.delete('/delete-course/:id', CreatorAuthenciation, validate(CourseValidation.deleteCourse), CourseController.deleteCourse);
router.get('/', CourseController.getLandingPageCourses);
router.get('/types', CourseController.getCourseTypes);
router.get('/search', CourseController.searchCourse);
router.get('/course-list/:creatorId', CreatorAuthenciation, validate(CourseValidation.getCourseList), CourseController.getCourseList);
router.get('/:id', validate(CourseValidation.getCourseDetail), CourseController.getCourse);
router.get('/count-view/:id', validate(CourseValidation.countCourseViewed), CourseController.countCourseViewed);
router.get('/rating/:id', UserAuthenciation, validate(CourseValidation.getCourseRating), CourseController.getCourseRating);
router.post('/rating', UserAuthenciation, validate(CourseValidation.addCourseRating), CourseController.addCourseRating);

// ======================= LESSON REALATE ROUTES ===================================
router.get('/lesson/types', CourseController.getLessonTypes);
router.get('/lesson/:courseId', validate(CourseValidation.getLessonList), CourseController.getLessonList);
router.get('/lesson/:courseId/:lessonId', validate(CourseValidation.getLessonDetail), CourseController.getLesson);
router.put('/lesson/:courseId/:lessonId', CreatorAuthenciation, validate(CourseValidation.updateLesson), CourseController.updateLesson);
router.delete('/lesson/:courseId/:lessonId', CreatorAuthenciation, validate(CourseValidation.deleteLesson), CourseController.deleteLesson);



module.exports = router;
