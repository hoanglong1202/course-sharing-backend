const config = require('../config');
const sql = require('mssql');

const getCreatorName = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(
      `SELECT creator_id as id, username as name
      FROM tblCreator
      ORDER BY creator_id DESC`
    );

    return result.recordset;
  } catch (error) {
    console.log(error)
  }
};

module.exports = { getCreatorName };
