const config = require('../config');
const sql = require('mssql');

const getCreatorName = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT creator_id as id, username as name
      FROM tblCreator
      WHERE status = N'Hoạt động'
      ORDER BY creator_id DESC`
    );

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const findCreatorByEmail = async (email) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(
        `select creator_id as id, email, username, description, pass, role, profile_picture, status from tblCreator where email = '${email}'`
      );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

const findCreatorById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(
        `select creator_id as id, email, username, description, pass, role, profile_picture, status from tblCreator where creator_id = '${id}'`
      );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

const getCreatorList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT creator_id as id, username as name, status, role, email
      FROM tblCreator
      ORDER BY creator_id DESC`
    );

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const removeCreator = async (id, status) => {
  try {
    let pool = await sql.connect(config.sql);

    const updateStatus = status === 'Hoạt động' ? 'Bị khóa' : 'Hoạt động';

    const query = `UPDATE tblCreator SET status = N'${updateStatus}' WHERE creator_id = ${parseInt(id)}`;

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const updateCreator = async (data) => {
  try {
    let pool = await sql.connect(config.sql);

    const { creator_id, email, username, profile_picture, description } = data;

    const query = `UPDATE tblCreator SET email = N'${email}', description = N'${description}', username = N'${username}', profile_picture = N'${profile_picture}' WHERE creator_id = ${parseInt(creator_id)}`;
    console.log(query)
    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

const addCreator = async (data) => {
  try {
    const { username, email, description, password, profile_picture } = data;

    let pool = await sql.connect(config.sql);
    const picture = profile_picture ? profile_picture : null;
    const result = await pool.request().query(
      `INSERT INTO tblCreator (email, username, pass, description, profile_picture) 
        VALUES ('${email}', N'${username}', N'${password}', N'${description}', N'${picture}') `
    );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

const getCreatorAnalysis = async (courseId, userId) => {
  try {
    let pool = await sql.connect(config.sql);

    const query = `SELECT C.creator_id as creatorId, CR.email, CR.username, count(*) as total_course
                  FROM tblCourses as C
                  JOIN tblCreator as CR ON CR.creator_id = C.creator_id
                  GROUP BY C.creator_id, CR.email, CR.username`

    const result = await pool.request().query(query);

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCreatorName,
  findCreatorByEmail,
  getCreatorList,
  removeCreator,
  findCreatorById,
  updateCreator,
  addCreator,
  getCreatorAnalysis,
};
