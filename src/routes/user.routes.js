const express = require('express');
const { UserController } = require('../controllers');
const { UserValidation } = require('../validations');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');
const UserAuthenciation = require('../middlewares/user.authenciation');

const router = express.Router();

const uploadCoverImage = uploads.fields([
  { name: "cover_picture", maxCount: 1 },
]);

router.get('/:id', validate(UserValidation.getUser), UserController.getUser);
router.put('/update-profile', UserAuthenciation, uploadCoverImage, validate(UserValidation.updateUser), UserController.updateUser);

module.exports = router;