const config = require('../config');
const sql = require('mssql');

const getMostFavouritedCourses = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT TOP(3) course_id as id, course_name, description, detail, viewed, favourited, cover_picture, point
      FROM tblCourses
      WHERE isDeleted = 'false' AND isApproved = 'true'
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
      `SELECT TOP(3) course_id as id, course_name, description, detail, viewed, favourited, cover_picture, point
      FROM tblCourses
      WHERE isDeleted = 'false' AND isApproved = 'true'
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
      `SELECT C.course_id as id, C.course_name, C.description, C.detail, C.viewed, C.favourited, C.cover_picture, 
              C.creator_id, CR.username as creator_name, C.point
      FROM tblCourses as C
      JOIN tblCreator as CR ON CR.creator_id = C.creator_id
      WHERE C.isDeleted = 'false' AND C.isApproved = 'true'
      GROUP BY C.course_id, C.course_name, C.description, C.detail, C.viewed, C.favourited, C.cover_picture, 
              C.creator_id, CR.username, C.point
      ORDER BY C.course_id DESC
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
      `SELECT C.course_id as id, C.course_name, C.description, C.detail, C.viewed, C.favourited, C.cover_picture, 
              C.creator_id, CR.username as creator_name,  CR.profile_picture, CR.description as creator_description,
              C.max_user, C.approved_date, C.types_id, C.isDeleted, C.point
      FROM tblCourses as C
      JOIN tblCreator as CR ON CR.creator_id = C.creator_id
      WHERE C.course_id = ${id}
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
      `SELECT lesson_id as id, lesson_name, description, content, course_id, lesson_types_id as types, isDeleted
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
      `SELECT L.lesson_id as id, L.lesson_name, L.content, L.description, L.lesson_types_id, C.course_id, C.course_name, 
              C.description as course_description, CR.creator_id, CR.username, CR.description as creator_description, CR.profile_picture,
              LT.lesson_types_name, L.isDeleted
      FROM tblLesson as L
      JOIN tblLessonTypes as LT on LT.lesson_types_id = L.lesson_types_id
      JOIN tblCourses as C on C.course_id = L.course_id
      JOIN tblCreator as CR on CR.creator_id = C.creator_id
      WHERE L.course_id = ${courseId}
      ORDER BY L.lesson_id ASC
      `
    );

    const creator = {
      creator_id: result.recordset[0].creator_id,
      creator_name: result.recordset[0].username,
      description: result.recordset[0].creator_description,
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

const getCourseTypes = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT L.types_id as id, L.types_name as name, L.isDeleted, COUNT(*) as total
        FROM tblTypes as L
        GROUP BY L.types_id, L.types_name, L.isDeleted
        ORDER BY L.types_id DESC
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
      ` SELECT C.course_id as id, C.course_name, C.description, C.max_user, C.register_link, 
              C.approved_date, C.viewed, C.favourited, C.cover_picture, C.creator_id, C.admin_id, C.isDeleted
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

const addCourse = async (data) => {
  try {
    let pool = await sql.connect(config.sql);
    const { course_name, description, creator_id, cover_picture, max_user, types_id } = data;

    const result = await pool.request()
      .query(`INSERT INTO tblCourses (course_name, description, creator_id, cover_picture, max_user, types_id) 
              VALUES (N'${course_name}', N'${description}', ${parseInt(creator_id)}, '${cover_picture}', '${max_user}', ${parseInt(types_id)})`);

    return result.recordset;

  } catch (error) {
    console.log(error.message);
  }
};

const addLesson = async (courseId, lesson) => {
  try {
    let pool = await sql.connect(config.sql);

    let temp = lesson;
    
    let lessonArr = lesson.map(x => `(N'${x.lesson_name}', N'${x.description}', N'${x.content}', ${parseInt(x.lesson_types_id)}, ${parseInt(courseId)})`).join(",");
    const insertLessonQuery = `INSERT INTO tblLesson (lesson_name, description, content, lesson_types_id, course_id) VALUES ${lessonArr}`;

    const result = await pool.request().query(insertLessonQuery);
    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
}

const getCourseByName = async (courseName) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT C.course_id as id, C.course_name, C.description, C.detail, C.viewed, C.favourited, C.cover_picture, 
              C.creator_id, CR.username as creator_name,  CR.profile_picture, CR.description as creator_description,
              C.max_user, C.approved_date
      FROM tblCourses as C
      JOIN tblCreator as CR ON CR.creator_id = C.creator_id
      WHERE C.course_name = N'${courseName}'
      `
    );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
}

const updateCourse = async (data) => {
  try {
    let pool = await sql.connect(config.sql);
    const {
      course_name,
      description,
      creator_id,
      cover_picture,
      id,
      max_user,
      types_id,
    } = data;

    const query = `UPDATE tblCourses
                  SET course_name = N'${course_name}', description = N'${description}', cover_picture = '${cover_picture}', max_user = ${max_user}, types_id = ${parseInt(types_id)}
                  WHERE course_id = ${parseInt(id)} AND creator_id = ${parseInt(creator_id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const searchCourse = async (data) => {
  try {
    let pool = await sql.connect(config.sql);
    const {
      courseName,
      courseType,
      creatorName,
      orderBy
    } = data;

    const query = `
      SELECT C.course_id as id, C.course_name, C.description, C.detail, C.viewed, C.favourited, C.cover_picture, 
              C.creator_id, CR.username as creator_name
      FROM tblCourses as C
      JOIN tblCreator as CR ON CR.creator_id = C.creator_id
      JOIN tblTypes as T ON T.types_id = C.types_id
      WHERE C.course_name LIKE N'%${courseName}%' AND T.types_name LIKE N'%${courseType}%' AND CR.username LIKE N'%${creatorName}%'
      GROUP BY C.course_id, C.course_name, C.description, C.detail, C.viewed, C.favourited, C.cover_picture, 
              C.creator_id, CR.username
      ORDER BY C.course_id ${orderBy || 'DESC'}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCourse = async (id, isDeleted) => {
  try {
    let pool = await sql.connect(config.sql);

    const status = isDeleted === 'true' ? 'false' : 'true';
    const query = `UPDATE tblCourses
                  SET isDeleted = N'${status}'
                  WHERE course_id = ${parseInt(id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const deleteLesson = async (courseId, lessonId, isDeleted) => {
  try {
    let pool = await sql.connect(config.sql);

    const status = isDeleted === 'true' ? 'false' : 'true';
    const query = `UPDATE tblLesson
                  SET isDeleted = N'${status}'
                  WHERE course_id = ${parseInt(courseId)} AND lesson_id = ${parseInt(lessonId)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const updateLesson = async (courseId, lessonId, data) => {
  try {
    let pool = await sql.connect(config.sql);
    const { lesson_name, description, content, lesson_types_id } = data;

    const query = `UPDATE tblLesson
                  SET lesson_name = N'${lesson_name}', description = N'${description}', 
                      content = N'${content}', lesson_types_id = ${parseInt(lesson_types_id)}
                  WHERE course_id = ${parseInt(courseId)} AND lesson_id = ${parseInt(lessonId)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const getAdminCourseList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT C.course_id as id, C.course_name, C.description, C.detail, C.viewed, C.favourited, C.cover_picture, 
              C.creator_id, CR.username as creator_name, C.isDeleted, C.isApproved, C.approved_date
      FROM tblCourses as C
      JOIN tblCreator as CR ON CR.creator_id = C.creator_id
      ORDER BY C.course_id DESC
      `
    );

    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const approveCourse = async (id) => {
  try {
    let pool = await sql.connect(config.sql);

    let currentDate = new Date();
    let dateString = currentDate.toISOString();

    const query = `UPDATE tblCourses
                  SET isApproved = N'true', approved_date = N'${dateString}'
                  WHERE course_id = ${parseInt(id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const getCourseTypeById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);

    const query = `SELECT * from tblTypes
                  WHERE types_id = ${parseInt(id)}`;

    const result = await pool.request().query(query);

    return result.recordset[0];
  } catch (error) {
    console.log(error.message)
  }
}

const getCourseTypeByName = async (name) => {
  try {
    let pool = await sql.connect(config.sql);

    const query = `SELECT * from tblTypes
                  WHERE types_name = N'${name}'`;

    const result = await pool.request().query(query);

    return result.recordset[0];
  } catch (error) {
    console.log(error.message)
  }
}

const deleteCourseType = async (id, isDeleted) => {
  try {
    let pool = await sql.connect(config.sql);

    const status = isDeleted === 'true' ? 'false' : 'true';
    const query = `UPDATE tblTypes
                  SET isDeleted = N'${status}'
                  WHERE types_id = ${parseInt(id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const updateCourseType = async (data) => {
  try {
    let pool = await sql.connect(config.sql);

    const { id, name } = data;

    const query = `UPDATE tblTypes
                  SET types_name = N'${name}'
                  WHERE types_id = ${parseInt(id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const addCourseType = async (data) => {
  try {
    let pool = await sql.connect(config.sql);

    const { name } = data;

    const query = `INSERT INTO tblTypes (types_name)
                  VALUES (N'${name}')`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const countCourseViewed = async (id, view) => {
  try {
    let pool = await sql.connect(config.sql);

    const coutnViewed = parseInt(view) + 1;
    const query = `UPDATE tblCourses
                  SET viewed = ${coutnViewed}
                  WHERE course_id = ${parseInt(id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const updateCourseFavourite = async (id, favourited) => {
  try {
    let pool = await sql.connect(config.sql);

    const query = `UPDATE tblCourses
                  SET favourited = ${favourited}
                  WHERE course_id = ${parseInt(id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getCourseRating = async (id) => {
  try {
    let pool = await sql.connect(config.sql);

    const query = `SELECT R.user_id as id, U.username, R.content, R.point, R.timestamp
                  FROM tblRating as R
                  JOIN tblUser as U on U.user_id = R.user_id
                  JOIN tblCourses As C on C.course_id = R.course_id
                  WHERE C.course_id = ${parseInt(id)}
                  ORDER BY R.timestamp DESC`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const addCourseRating = async (data) => {
  try {
    let pool = await sql.connect(config.sql);

    const { courseId, userId, content, point } = data;

    let currentDate = new Date();
    let dateString = currentDate.toISOString();

    const query = `INSERT INTO tblRating (course_id, user_id, content, point, timestamp)
                  VALUES (${parseInt(courseId)}, ${parseInt(userId)}, N'${content}', ${parseFloat(point)}, N'${dateString}')`;
    console.log(query)
    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const addLessonComment = async (data) => {
  try {
    let pool = await sql.connect(config.sql);

    const { courseId, lessonId, username, isCreator, content } = data;

    let currentDate = new Date();
    let dateString = currentDate.toISOString();

    const query = `INSERT INTO tblComments (course_id, lesson_id, username, isCreator, content, timestamp)
                  VALUES (${parseInt(courseId)}, ${parseInt(lessonId)}, N'${username}', N'${isCreator}', N'${content}', N'${dateString}')`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

const getLessonComment = async (courseId, lessonId) => {
  try {
    let pool = await sql.connect(config.sql);

    const query = `SELECT	C.course_id as courseId, C.username, C.lesson_id as lessonId,
                  C.comment_id as commentId, C.content, C.timestamp, C.isCreator
                  FROM tblComments as C
                  WHERE course_id = ${parseInt(courseId)} AND lesson_id = ${parseInt(lessonId)}
                  ORDER BY C.comment_id DESC`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  getMostFavouritedCourses,
  getMostViewedCourses,
  getAllCourse,
  getCourse,
  getLesson,
  getLessonListDetail,
  getLessonTypes,
  getCourseList,
  addCourse,
  addLesson,
  getCourseByName,
  updateCourse,
  getCourseTypes,
  searchCourse,
  deleteCourse,
  deleteLesson,
  updateLesson,
  getAdminCourseList,
  approveCourse,
  deleteCourseType,
  updateCourseType,
  addCourseType,
  getCourseTypeById,
  getCourseTypeByName,
  countCourseViewed,
  updateCourseFavourite,
  getCourseRating,
  addCourseRating,
  addLessonComment,
  getLessonComment,
};
