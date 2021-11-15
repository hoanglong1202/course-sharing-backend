const express = require('express');
const { AuthController } = require('../controllers');
const { AuthValidation } = require('../validations');
const validate = require('../middlewares/validate');
const router = express.Router();

router.post('/register', validate(AuthValidation.register), AuthController.register);
router.post('/signin', validate(AuthValidation.signin), AuthController.signin);

module.exports = router;
