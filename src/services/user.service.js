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

const getUserList = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT user_id as id, username as name, status, role
      FROM tblUser
      ORDER BY user_id DESC`
    );

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findUserByEmail,
  getUserList,
};
