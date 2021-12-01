const config = require('../config');
const sql = require('mssql');


const register = async (data) => {
  try {
    const { username, email, password } = data;

    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `INSERT INTO tblUser (email, username, pass, user_types_id) 
        VALUES ('${email}', N'${username}', N'${password}', 1) `
    );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

const signin = async (email, password) => {
  try {
    let pool = await sql.connect(config.sql);

    const result = await pool.request().query(
      `SELECT email, username, role, profile_picture, status, user_types_id
      FROM tblUser WHERE email = '${email}' AND pass = '${password}'`
    );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  register,
  signin,
};
