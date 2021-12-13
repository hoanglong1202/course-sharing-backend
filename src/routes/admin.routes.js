const express = require('express');
const { AdminController } = require('../controllers');
// const { CourseValidation } = require('../validations');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');
const CreatorAuthenciation = require('../middlewares/creator.authenciation');

const router = express.Router();

router.get('/', CreatorAuthenciation, AdminController.showUserList);

module.exports = router;