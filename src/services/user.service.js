const config = require('../config');
const sql = require('mssql');

const findUserByEmail = async (email) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(`select user_id as id, email, username, pass, role, profile_picture, status, user_types_id from tblUser where email = '${email}'`);
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

const findUserById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(`select user_id as id, email, username, pass, role, profile_picture, status, user_types_id from tblUser where user_id = '${id}'`);
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};


const getUserList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT user_id as id, username as name, status, role, email
      FROM tblUser
      ORDER BY user_id DESC`
    );

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const removeUser = async (id, status) => {
  try {
    let pool = await sql.connect(config.sql);

    const updateStatus = status === 'Hoạt động' ? 'Bị khóa' : 'Hoạt động';

    const query = `UPDATE tblUser SET status = N'${updateStatus}' WHERE user_id = ${parseInt(id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (data) => {
  try {
    let pool = await sql.connect(config.sql);

    const { user_id, email, username, profile_picture } = data;

    const query = `UPDATE tblUser SET email = N'${email}', username = N'${username}', profile_picture = N'${profile_picture}' WHERE user_id = ${parseInt(user_id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const addUserFavourite = async (courseId, userId) => {
  try {
    let pool = await sql.connect(config.sql);

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString();

    const query = `INSERT INTO tblUserFavourite (course_id, user_id, timestamp)
                  VALUES (${courseId}, ${userId}, N'${currentDateString}')`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const removeUserFavourite = async (courseId, userId) => {
  try {
    let pool = await sql.connect(config.sql);

    const query = `DELETE FROM tblUserFavourite WHERE course_id = ${parseInt(courseId)} AND user_id = ${parseInt(userId)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const getUserFavourite = async (userId) => {
  try {
    let pool = await sql.connect(config.sql);

    const query = `SELECT U.course_id as courseId, C.course_name as courseName, U.user_id as userId, U.timestamp, C.cover_picture
                  FROM tblUserFavourite as U
                  JOIN tblCourses as C ON C.course_id = U.course_id
                  WHERE user_id = ${parseInt(userId)}`

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const addUserHistory = async (lessonId, userId) => {
  try {
    let pool = await sql.connect(config.sql);

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString();

    const query = `INSERT INTO tblUserHistory (lesson_id, user_id, timestamp)
                  VALUES (${lessonId}, ${userId}, N'${currentDateString}')`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const getUserHistoryList = async (userId) => {
  try {
    let pool = await sql.connect(config.sql);

    const query = `SELECT UH.user_id AS userId, T.course_id as courseId, T.learned, T2.total
                  FROM tblUserHistory AS UH
                  JOIN (SELECT UH.user_id AS userId, C.course_id, COUNT(*) AS learned
                      FROM tblUserHistory AS UH
                      JOIN tblLesson AS L on L.lesson_id = UH.lesson_id
                      JOIN tblCourses AS C on C.course_id = L.course_id
                      GROUP BY UH.user_id, C.course_id) AS T ON T.userId = UH.user_id
                  JOIN (SELECT C.course_id AS courseId , COUNT(*) AS total
                      FROM tblLesson AS L
                      JOIN tblCourses AS C on C.course_id = L.course_id
                      GROUP BY C.course_id) AS T2 ON T2.courseId = T.course_id
                  WHERE UH.user_id = ${parseInt(userId)}
                  GROUP BY UH.user_id, T.course_id, T.learned, T2.total
                  ORDER BY T.course_id DESC`;

    const lastLessonQuery = `
                  SELECT C.course_id as courseId, C.course_name as courseName, UH.user_id as userId, 
                    LAST_VALUE(UH.lesson_id) OVER (PARTITION BY UH.user_id ORDER BY C.course_id) as lessonId, UH.timestamp, C.cover_picture
                  FROM tblUserHistory as UH
                  JOIN tblLesson as L on L.lesson_id = UH.lesson_id
                  JOIN tblCourses as C on C.course_id = L.course_id
                  WHERE UH.user_id = ${parseInt(userId)} 
                  AND UH.lesson_id IN
                  (
                    SELECT LAST_VALUE(UH.lesson_id) OVER (PARTITION BY UH.user_id ORDER BY C.course_id) as lessonId
                    FROM tblUserHistory as UH
                    JOIN tblLesson as L on L.lesson_id = UH.lesson_id
                    JOIN tblCourses as C on C.course_id = L.course_id
                    WHERE UH.user_id = ${parseInt(userId)}
                  )
                  ORDER BY C.course_id DESC`;

    const result = await pool.request().query(query);
    const lastLessons = await pool.request().query(lastLessonQuery);

    const mappingData = result.recordset.map((item, index) => {
      const currenLesson = lastLessons.recordset[index];
      return {
        courseName: currenLesson.courseName,
        lessonId: currenLesson.lessonId,
        ...item,
        timestamp: currenLesson.timestamp,
        cover_picture: currenLesson.cover_picture,
      };
    });

    return mappingData.sort((a, b) => (a.timestamp < b.timestamp) - (a.timestamp > b.timestamp));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findUserByEmail,
  getUserList,
  removeUser,
  findUserById,
  updateUser,
  addUserFavourite,
  getUserFavourite,
  removeUserFavourite,
  addUserHistory,
  getUserHistoryList,
};
