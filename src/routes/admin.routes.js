const express = require('express');
const { AdminController } = require('../controllers');
const { AdminValidation } = require('../validations');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');
const CreatorAuthenciation = require('../middlewares/creator.authenciation');

const router = express.Router();

router.get('/', CreatorAuthenciation, AdminController.showUserList);
router.delete('/delete-creator/:id', CreatorAuthenciation, validate(AdminValidation.removeCreator), AdminController.removeCreator);
router.delete('/delete-user/:id', CreatorAuthenciation, validate(AdminValidation.removeUser), AdminController.removeUser);

module.exports = router;