const config = require('../config');
const sql = require('mssql');

const register = async (data) => {
  try {
    const { username, firstname, lastname, password } = data;

    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `INSERT INTO tblUser (user_name, firstname, lastname, pass, user_types_id) 
        VALUES ('${username}', N'${firstname}', N'${lastname}', '${password}', 1) `
    );
    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const signin = async (username, password) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT user_name, firstname, lastname, profile_picture, status, user_types_id
      FROM tblUser WHERE user_name = '${username}' AND pass = '${password}'`
    );
    return result.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  register,
  signin,
};
