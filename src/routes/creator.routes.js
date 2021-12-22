const express = require('express');
const { CreatorController } = require('../controllers');
const { CreatorValidation } = require('../validations');
const validate = require('../middlewares/validate');
const uploads = require('../middlewares/uploadFiles');
const CreatorAuthenciation = require('../middlewares/creator.authenciation');

const router = express.Router();

const uploadCoverImage = uploads.fields([
  { name: "cover_picture", maxCount: 1 },
]);

// ========================= Creator ===============================
router.get('/name', CreatorAuthenciation, CreatorController.getCreatorName);
router.get('/:id', CreatorAuthenciation, CreatorController.getCreator);
router.put('/update-profile', CreatorAuthenciation, uploadCoverImage, validate(CreatorValidation.updateCreator), CreatorController.updateCreator);

module.exports = router;