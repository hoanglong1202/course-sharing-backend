const { UserService, CourseService } = require('../services');
const { NotFoundError, BadRequestError } = require('../helper/errors');

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserService.findUserById(id);
    if (!result) {
      throw new NotFoundError('User not found!');
    }

    delete result.pass;

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    const result = await UserService.findUserById(user_id);
    if (!result) {
      throw new NotFoundError('User not found!');
    }

    await UserService.updateUser(req.body);

    res.status(200).send({
      success: true,
      message: 'Update user successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

const addUserFavourite = async (req, res, next) => {
  try {
    const { courseId, userId } = req.params;

    const user = await UserService.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const course = await CourseService.getCourse(courseId);
    if (!course) {
      throw new NotFoundError('Course not found!');
    }

    const favourited = parseInt(course.favourited) + 1;
    await UserService.addUserFavourite(courseId, userId);
    await CourseService.updateCourseFavourite(courseId, favourited);
 
    res.status(200).send({
      success: true,
      message: 'Add User Favourite successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

const removeUserFavourite = async (req, res, next) => {
  try {
    const { courseId, userId } = req.params;

    const user = await UserService.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const course = await CourseService.getCourse(courseId);
    if (!course) {
      throw new NotFoundError('Course not found!');
    }

    const favourited = parseInt(course.favourited) - 1;
    await UserService.removeUserFavourite(courseId, userId);
    await CourseService.updateCourseFavourite(courseId, favourited);
 
    res.status(200).send({
      success: true,
      message: 'Remove User Favourite successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

const getUserFavourite = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserService.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const result = await UserService.getUserFavourite(userId);
 
    res.status(200).send({
      success: true,
      message: 'Get User Favourite successfullyy',
      dataObj: result
    });
  } catch (error) {
    next(error);
  }
};

const getUserHistoryList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserService.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const result = await UserService.getUserHistoryList(userId);
    if (!result) {
      throw new NotFoundError('History not found!');
    }

    const percent = Math.round(parseInt(result.learned) * 100 / parseInt(result.total));
    result.percent = percent;
 
    res.status(200).send({
      success: true,
      message: 'Get User History successfullyy',
      dataObj: result
    });
  } catch (error) {
    next(error);
  }
};

const addUserHistory = async (req, res, next) => {
  try {
    const { courseId, lessonId, userId } = req.body;

    const user = await UserService.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    const lesson = await CourseService.getLesson(lessonId, courseId);
    if (!lesson) {
      throw new NotFoundError('lesson not found!');
    }

    await UserService.addUserHistory(lessonId, userId);
 
    res.status(200).send({
      success: true,
      message: 'Add User History successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  addUserFavourite,
  getUserFavourite,
  removeUserFavourite,
  getUserHistoryList,
  addUserHistory,
};
