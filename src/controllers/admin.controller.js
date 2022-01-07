const { UserService, CreatorService, AdminService, CourseService } = require('../services');
const { NotFoundError, BadRequestError } = require('../helper/errors');
const bcrypt = require('bcrypt');
const { newLesson, approvedCourse } = require('../helper/mailTemplate');
const mailer = require('../helper/mailer');

const showUserList = async (req, res, next) => {
  try {
    const userList = await UserService.getUserList();
    const creatorList = await CreatorService.getCreatorList();

    const totalActiveUser = userList.filter(item => item.status === 'Hoạt động').length;
    const totalActiveCreator = creatorList.filter(item => item.status === 'Hoạt động').length;

    const totalInactiveUser = userList.filter(item => item.status === 'Bị khóa').length;
    const totalinactiveCreator = creatorList.filter(item => item.status === 'Bị khóa').length;

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: {
        totalActiveUser,
        totalActiveCreator,
        totalInactiveUser,
        totalinactiveCreator,
        userList,
        creatorList,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req, res, next) => {
  try {
    let { id } = req.params;

    const user = await UserService.findUserById(id);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    await UserService.removeUser(id, user.status);

    res.status(200).send({
      success: true,
      message: 'Delete User successfullyy'
    });
  } catch (error) {
    next(error);
  }
};

const removeCreator = async (req, res, next) => {
  try {
    let { id } = req.params;

    const creator = await CreatorService.findCreatorById(id);
    if (!creator) {
      throw new NotFoundError('Creator not found!');
    }

    await CreatorService.removeCreator(id, creator.status);

    res.status(200).send({
      success: true,
      message: 'Delete Creator successfullyy'
    });
  } catch (error) {
    next(error);
  }
};

const addCreator = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isValidUsername = await CreatorService.findCreatorByEmail(email);

    if (isValidUsername) {
      throw new BadRequestError('Username is already taken');
    }

    const temp = req.body;
    delete temp.password;

    const creator = {
      ...temp,
      password: await bcrypt.hash(password, 10),
    };

    await CreatorService.addCreator(creator);

    res.status(200).send({
      success: true,
      message: 'Add Creator successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

const getAdminCourseList = async (req, res, next) => {
  try {

    const course = await CourseService.getAdminCourseList();
    if (!course) {
      throw new NotFoundError('Course not found!');
    }

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: course,
    });
  } catch (error) {
    next(error);
  }
}

const approveCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseService.getCourse(id);
    if (!course) {
      throw new NotFoundError('Course not found!');
    }

    const checked = await CourseService.approveCourse(id);

    if (checked === `success`) {
      const mail = approvedCourse(course.creator_name, id);
      await mailer(course.email, mail);
    }

    res.status(200).send({
      success: true,
      message: 'Approve Course successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

const addCourseType = async (req, res, next) => {
  try {
    const { name } = req.body;
    const type = await CourseService.getCourseTypeByName(name);
    if (type) {
      throw new NotFoundError('Course type is existed!');
    }

    await CourseService.addCourseType(req.body);

    res.status(200).send({
      success: true,
      message: 'Add Course Type successfullyy',
    });
  } catch (error) {
    next(error);
  }
}

const removeCourseType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const type = await CourseService.getCourseTypeById(id);
    if (!type) {
      throw new NotFoundError('Types not found!');
    }

    await CourseService.deleteCourseType(id, type.isDeleted);

    res.status(200).send({
      success: true,
      message: 'Delete Course Type successfullyy',
    });
  } catch (error) {
    next(error);
  }
}

const updateCourseType = async (req, res, next) => {
  try {
    const { id } = req.body;
    const type = await CourseService.getCourseTypeById(id);
    if (!type) {
      throw new NotFoundError('Types not found!');
    }

    await CourseService.updateCourseType(req.body);

    res.status(200).send({
      success: true,
      message: 'Update Course Type successfullyy',
    });
  } catch (error) {
    next(error);
  }
}

const getAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await AdminService.findAdminById(id);
    if (!result) {
      throw new NotFoundError('Types not found!');
    }
    delete result.pass;
    
    res.status(200).send({
      success: true,
      message: 'Get Admin successfullyy',
      dataObj: result
    });
  } catch (error) {
    next(error);
  }
}


const updateAdmin = async (req, res, next) => {
  try {
    const { admin_id } = req.body;

    const result = await AdminService.findAdminById(admin_id);
    if (!result) {
      throw new NotFoundError('Admin not found!');
    }

    await AdminService.updateAdmin(req.body);

    res.status(200).send({
      success: true,
      message: 'Update admin successfullyy',
    });
  } catch (error) {
    next(error);
  }
};

const getCourseAnalysis = async (req, res, next) => {
  try {
    const result = await CourseService.getCourseAnalysis();

    res.status(200).send({
      success: true,
      message: 'Get Course Analysis successfullyy',
      dataObj: result
    });
  } catch (error) {
    next(error);
  }
};

const getCreatorAnalysis = async (req, res, next) => {
  try {
    const result = await CreatorService.getCreatorAnalysis();

    res.status(200).send({
      success: true,
      message: 'Get User Lesson History successfullyy',
      dataObj: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  showUserList,
  removeUser,
  removeCreator,
  addCreator,
  getAdminCourseList,
  approveCourse,
  addCourseType,
  removeCourseType,
  updateCourseType,
  getAdmin,
  updateAdmin,
  getCourseAnalysis,
  getCreatorAnalysis,
};
