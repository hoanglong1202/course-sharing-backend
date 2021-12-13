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


const countActiveUser = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(`select COUNT(*) as total from tblUser where status = N'Hoạt động'`);
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  findUserByEmail,
  countActiveUser,
};
