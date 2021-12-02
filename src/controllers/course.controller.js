const { CourseService } = require('../services');
const { NotFoundError } = require('../helper/errors');

const getLandingPageCourses = async (req, res, next) => {
  try {
    const { page: pageQuery, limit: limitQuery } = req.query;
    const page = parseInt(pageQuery) || 1;
    const limit = parseInt(limitQuery) || 6;

    const favouritedCourse = await CourseService.getMostFavouritedCourses();
    const viewedCourse = await CourseService.getMostViewedCourses();
    const courses = await CourseService.getAllCourse(page, limit);

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: {
        favouritedCourse,
        viewedCourse,
        courses,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await CourseService.getCourse(id);
    if(!course) {
      throw new NotFoundError('Course not found!')
    }

    res.status(200).send({
      success: true,
      message: 'Fetching data successfullyy',
      dataObj: {
        course,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLandingPageCourses,
  getCourse,
};
