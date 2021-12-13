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

module.exports = {
  findUserByEmail,
  getUserList,
  removeUser,
  findUserById,
};
