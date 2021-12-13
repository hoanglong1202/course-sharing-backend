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
        `select creator_id as id, email, username, description, pass, role, profile_picture from tblCreator where email = '${email}'`
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
      `SELECT creator_id as id, username as name, status, role
      FROM tblCreator
      ORDER BY creator_id DESC`
    );

    return result.recordset;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCreatorName, findCreatorByEmail, getCreatorList };
