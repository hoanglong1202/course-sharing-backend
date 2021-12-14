const express = require('express');
const { AuthController } = require('../controllers');
const { AuthValidation } = require('../validations');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');

const router = express.Router();

const uploadCoverImage = uploads.fields([
  { name: "cover_picture", maxCount: 1 },
]);

router.post('/register', uploadCoverImage, validate(AuthValidation.register), AuthController.register);
router.post('/signin', validate(AuthValidation.signin), AuthController.signin);

module.exports = router;
