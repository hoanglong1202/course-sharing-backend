const config = require('../config');
const sql = require('mssql');

const getMostFavouritedCourses = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT TOP(3) course_id as id, course_name, description, detail, viewed, favourited, cover_picture
      FROM tblCourses
      ORDER BY favourited DESC`
    );
    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getMostViewedCourses = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT TOP(3) course_id as id, course_name, description, detail, viewed, favourited, cover_picture
      FROM tblCourses
      ORDER BY viewed DESC`
    );
    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getAllCourse = async (page, limit) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT course_id as id, course_name, description, detail, viewed, favourited, cover_picture
      FROM tblCourses
      ORDER BY id
      OFFSET ${(page - 1) * limit} ROWS 
      FETCH NEXT ${limit} ROWS ONLY;
      `
    );

    const total_course = await pool
      .request()
      .query(`SELECT COUNT(*) as total_course FROM tblCourses`);

    return {
      courses: result.recordset,
      total_course: total_course.recordset[0].total_course,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const getCourse = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT C.course_id as id, C.course_name, C.description, C.detail, C.viewed, C.favourited, C.cover_picture, C.creator_id, CR.username as creator_name,  CR.profile_picture, CR.description as creator_description
      FROM tblCourses as C
      JOIN tblCreator as CR ON CR.creator_id = C.creator_id
      WHERE course_id = ${id}
      `
    );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

const getLesson = async (lessonId, courseId) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT lesson_id as id, lesson_name, description, content, course_id, lesson_types_id as types
      FROM tblLesson
      WHERE course_id = ${courseId} AND lesson_id = ${lessonId}
      `
    );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

const getLessonListDetail = async (courseId) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT L.lesson_id as id, L.lesson_name, C.course_id, C.course_name, C.description as course_description, CR.creator_id, CR.username, CR.description, CR.profile_picture
      FROM tblLesson as L
      JOIN tblCourses as C on C.course_id = L.course_id
      JOIN tblCreator as CR on CR.creator_id = C.creator_id
      WHERE L.course_id = ${courseId}
      ORDER BY L.lesson_id ASC
      `
    );

    const creator = {
      creator_id: result.recordset[0].creator_id,
      creator_name: result.recordset[0].username,
      description: result.recordset[0].description,
      profile_picture: result.recordset[0].profile_picture,
    };

    const course = {
      course_id: result.recordset[0].course_id,
      course_name: result.recordset[0].course_name,
      description: result.recordset[0].course_description,
    };

    return {
      lessonList: result.recordset,
      total: result.recordset.length,
      firstLesson: result.recordset[0],
      creator,
      course,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const getLessonTypes = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT L.lesson_types_id as id, L.lesson_types_name as name
        FROM tblLessonTypes as L
        ORDER BY L.lesson_types_id ASC
        `
    );

    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getCourseList = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      ` SELECT C.course_id as id, C.course_name, C.description, C.max_user, C.register_link, C.approved_date, C.viewed, C.favourited, C.cover_picture, C.creator_id, C.admin_id
        FROM tblCourses as C
        WHERE creator_id = '${id}'
        ORDER BY C.course_id ASC
        `
    );

    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getMostFavouritedCourses,
  getMostViewedCourses,
  getAllCourse,
  getCourse,
  getLesson,
  getLessonListDetail,
  getLessonTypes,
  getCourseList,
};
