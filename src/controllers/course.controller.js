const { CourseService } = require('../services');
const { NotFoundError } = require('../helper/errors');
const { Table } = require('mssql');

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

    console.log('total_course', total_course);

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
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
    console.log('total', total);

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

    console.log('lesson', lesson);
    console.log('course', course);

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

    const { lessonList, creator, course: courseDetail } =
      await CourseService.getLessonListDetail(course);
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

module.exports = {
  getLandingPageCourses,
  getCourse,
  getLesson,
  getLessonList,
};
