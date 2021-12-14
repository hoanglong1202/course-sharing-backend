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
router.delete('/delete-creator/:id', AdminAuthenciation, validate(AdminValidation.removeCreator), AdminController.removeCreator);
router.delete('/delete-user/:id', AdminAuthenciation, validate(AdminValidation.removeUser), AdminController.removeUser);
router.post('/add-creator', uploadCoverImage, AdminAuthenciation, validate(AdminValidation.addCreator), AdminController.addCreator);

module.exports = router;