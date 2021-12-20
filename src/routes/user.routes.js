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
router.get('/user-favourite/:courseId/:userId', UserAuthenciation, validate(UserValidation.getUserFavourite), UserController.getUserFavourite);
router.get('/add-user-favourite/:courseId/:userId', UserAuthenciation, validate(UserValidation.addUserFavourite), UserController.addUserFavourite);
router.delete('/user-favourite/:courseId/:userId', UserAuthenciation, validate(UserValidation.removeUserFavourite), UserController.removeUserFavourite);
router.post('/user-history', UserAuthenciation, validate(UserValidation.addUserHistory), UserController.addUserHistory);
router.get('/user-history/:userId', UserAuthenciation, validate(UserValidation.getUserHistoryList), UserController.getUserHistoryList);

module.exports = router;