const express = require('express');
const { CreatorController } = require('../controllers');
// const { CourseValidation } = require('../validations');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');
const CreatorAuthenciation = require('../middlewares/creator.authenciation');

const router = express.Router();

router.get('/name', CreatorAuthenciation, CreatorController.getCreatorName);

module.exports = router;