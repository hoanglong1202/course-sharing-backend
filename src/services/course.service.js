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

    const total_course = await pool.request().query(
      `SELECT COUNT(*) as total_course FROM tblCourses`
    );

    return {
      courses: result.recordset,
      total_course: total_course.recordset[0].total_course
    };
  } catch (error) {
    console.log(error.message);
  }
};

const getCourse = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT C.course_id as id, C.course_name, C.description, C.detail, C.viewed, C.favourited, C.cover_picture, C.creator_id, CR.username as creator_name,  CR.profile_picture
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

module.exports = {
  getMostFavouritedCourses,
  getMostViewedCourses,
  getAllCourse,
  getCourse,
};
