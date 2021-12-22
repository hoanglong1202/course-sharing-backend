const config = require('../config');
const sql = require('mssql');

const findAdminByEmail = async (email) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(
        `select admin_id as id, email, username, pass, role, profile_picture from tblAdmin where email = '${email}'`
      );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

const findAdminById = async (id) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .query(
        `select admin_id as id, email, username, pass, role, profile_picture from tblAdmin where admin_id = '${parseInt(id)}'`
      );
    return result.recordset[0];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { findAdminByEmail, findAdminById };
