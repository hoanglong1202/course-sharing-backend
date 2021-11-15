const config = require('../config');
const sql = require('mssql');

const findUserByUsername = async (username) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(`select user_name, firstname, lastname, profile_picture, status, user_types_id from tblUser where user_name = '${username}'`);
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  findUserByUsername,
};
