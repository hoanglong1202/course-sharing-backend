const { CourseService, UserService } = require('../services');
const { NotFoundError, BadRequestError } = require('../helper/errors');

const getLandingPageCourses = async (req, res, next) => {
  try {
    const { page: pageQuery, limit: limitQuery } = req.query;
    const page = parseInt(pageQuery) || 1;
    const limit = parseInt(limitQuery) || 6;

    const favouritedCourse = await CourseService.getMostFavouritedCourses();
    const viewedCourse = await CourseService.getMostViewedCourses();
    const { courses, total_course } = await CourseService.getAllCourse(
      page,
      limit
    );

    res.status(200).send({
      success: true,
      message: 'Fetching data successfully',
      dataObj: {
        favouritedCourse,
        viewedCourse,
        courses,
      },
      pagination: { page, limit, total: total_course },
    });
  } catch (error) {
    next(error);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await CourseService.getCourse(id);
    if (!course) {
      throw new NotFoundError('Course not found!');
    }

    const total = await CourseService.getLessonListDetail(id);

    const result = {
      ...course,
      ...total,
    };

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const getLesson = async (req, res, next) => {
  try {
    const { lessonId, courseId } = req.params;

    const lesson = parseInt(lessonId) || null;
    const course = parseInt(courseId) || null;

    const result = await CourseService.getLesson(lesson, course);
    if (!result) {
      throw new NotFoundError('Lesson not found!');
    }

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const getLessonList = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = parseInt(courseId) || null;

    const {
      lessonList,
      creator,
      course: courseDetail,
    } = await CourseService.getLessonListDetail(course);
    if (!lessonList) {
      throw new NotFoundError('Lesson list not found!');
    }

    const mappingData = lessonList.map((item) => {
      return {
        id: item.id,
        lesson_name: item.lesson_name,
      };
    });

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: mappingData,
      creator,
      courseDetail,
    });
  } catch (error) {
    next(error);
  }
};

const getLessonTypes = async (req, res, next) => {
  try {
    const result = await CourseService.getLessonTypes();
    if (!result) {
      throw new NotFoundError('Lesson types not found!');
    }

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseTypes = async (req, res, next) => {
  try {
    const result = await CourseService.getCourseTypes();
    if (!result) {
      throw new NotFoundError('Course types not found!');
    }

    res.status(200).send({
      success: true,
      message: 'Fetching data successfully',
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCourseList = async (req, res, next) => {
  try {
    const { creatorId } = req.params;
    const result = await CourseService.getCourseList(creatorId);
    if (!result) {
      throw new NotFoundError('Course list not found!');
    }

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: result,
    });
  } catch (error) {
    next(error);
  }
};

const addCourse = async (req, res, next) => {
  try {
    const { lesson } = req.body;
    let data = { ...req.body };

    const isCourseNameExist = await CourseService.getCourseByName(data.course_name);

    if (isCourseNameExist) {
      throw new BadRequestError('Course name already existed');
    }

    const parseLesson = JSON.parse(lesson);
    data.lesson = parseLesson;

    await CourseService.addCourse(data);
    const result = await CourseService.getCourseByName(data.course_name);

    if (!result) {
      throw new BadRequestError('Cannot add course');
    }

    await CourseService.addLesson(result.id, data.lesson);

    res.status(200).send({
      success: true,
      message: 'Add Course successfullyy'
    });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    let data = { ...req.body };

    await CourseService.updateCourse(data);

    res.status(200).send({
      success: true,
      message: 'Update Course successfullyy'
    });
  } catch (error) {
    next(error);
  }
};

const searchCourse = async (req, res, next) => {
  try {
    let courseName = req.query.courseName || '';
    let courseType = req.query.courseType || '';
    let creatorName = req.query.creatorName || '';
    let orderBy = req.query.orderBy || 'ASC';

    const result = await CourseService.searchCourse({
      courseName,
      courseType,
      creatorName,
      orderBy,
    });

    if (!result) {
      throw new NotFoundError('Course type not found');
    }

    res.status(200).send({
      success: true,
      message: 'Update Course successfullyy',
      dataObj: result
    });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    let { id } = req.params;

    const course = await CourseService.getCourse(id);
    if (!course) {
      throw new NotFoundError('Course not found!');
    }

    await CourseService.deleteCourse(id, course.isDeleted);

    res.status(200).send({
      success: true,
      message: 'Delete Course successfullyy'
    });
  } catch (error) {
    next(error);
  }
};

const deleteLesson = async (req, res, next) => {
  try {
    const { lessonId, courseId } = req.params;

    const lesson = parseInt(lessonId) || null;
    const course = parseInt(courseId) || null;

    const result = await CourseService.getLesson(lesson, course);
    if (!result) {
      throw new NotFoundError('Lesson not found!');
    }

    await CourseService.deleteLesson(course, lesson, result.isDeleted);

    res.status(200).send({
      success: true,
      message: 'Delete Lesson successfullyy'
    });
  } catch (error) {
    next(error);
  }
};

const updateLesson = async (req, res, next) => {
  try {
    const { lessonId, courseId } = req.params;

    const lesson = parseInt(lessonId) || null;
    const course = parseInt(courseId) || null;

    const result = await CourseService.getLesson(lesson, course);
    if (!result) {
      throw new NotFoundError('Lesson not found!');
    }

    await CourseService.updateLesson(course, lesson, req.body);

    res.status(200).send({
      success: true,
      message: 'Update Lesson successfullyy'
    });
  } catch (error) {
    next(error);
  }
};

const countCourseViewed = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await CourseService.getCourse(id);
    if (!course) {
      throw new NotFoundError('Course not found!');
    }

    await CourseService.countCourseViewed(id, course.viewed);

    res.status(200).send({
      success: true,
      message: 'Update Course viewed successfullyy'
    });
  } catch (error) {
    next(error);
  }
};

const getCourseRating = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await CourseService.getCourse(id);
    if (!course) {
      throw new NotFoundError('Course not found!');
    }

    const result = await CourseService.getCourseRating(id);
    if (!result) {
      throw new NotFoundError('Not found!');
    }

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: result
    });
  } catch (error) {
    next(error);
  }
};

const addCourseRating = async (req, res, next) => {
  try {
    const { courseId, userId } = req.body;

    const course = await CourseService.getCourse(courseId);
    if (!course) {
      throw new NotFoundError('Course not found!');
    }

    const user = await UserService.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found!');
    }

    await CourseService.addCourseRating(req.body);

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLandingPageCourses,
  getCourse,
  getLesson,
  getLessonList,
  getLessonTypes,
  getCourseList,
  addCourse,
  updateCourse,
  getCourseTypes,
  searchCourse,
  deleteCourse,
  deleteLesson,
  updateLesson,
  countCourseViewed,
  getCourseRating,
  addCourseRating,
};
