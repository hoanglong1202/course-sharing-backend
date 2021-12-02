const express = require('express');
const { CourseController } = require('../controllers');
const { CourseValidation } = require('../validations');
const validate = require('../middlewares/validate');
const router = express.Router();

router.get('/', CourseController.getLandingPageCourses);
router.get('/:id', validate(CourseValidation.getCourseDetail), CourseController.getCourse);

module.exports = router;
