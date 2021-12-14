const express = require('express');
const { AdminController } = require('../controllers');
const { AdminValidation } = require('../validations');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');
const AdminAuthenciation = require('../middlewares/admin.authenciation');

const router = express.Router();

const uploadCoverImage = uploads.fields([
  { name: "cover_picture", maxCount: 1 },
]);

router.get('/', AdminAuthenciation, AdminController.showUserList);
router.get('/course-list', AdminAuthenciation, AdminController.getAdminCourseList);

router.delete('/delete-creator/:id', AdminAuthenciation, validate(AdminValidation.removeCreator), AdminController.removeCreator);
router.delete('/delete-user/:id', AdminAuthenciation, validate(AdminValidation.removeUser), AdminController.removeUser);
router.post('/add-creator', uploadCoverImage, AdminAuthenciation, validate(AdminValidation.addCreator), AdminController.addCreator);
router.put('/approved-course/:id', AdminAuthenciation, validate(AdminValidation.approvedCourse), AdminController.approveCourse);

// ========================= Course Type ===============================
router.delete('/delete-course-type/:id', AdminAuthenciation, validate(AdminValidation.removeCourseType), AdminController.removeCourseType);
router.post('/add-course-type', AdminAuthenciation, validate(AdminValidation.addCourseType), AdminController.addCourseType);
router.put('/update-course-type', AdminAuthenciation, validate(AdminValidation.updateCourseType), AdminController.updateCourseType);

module.exports = router;