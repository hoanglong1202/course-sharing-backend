'use strict';
const fs = require('fs-extra');
const { join } = require('path');
const jwt = require('jsonwebtoken');

const loadSqlQueries = async (folderName) => {
  const filePath = join(process.cwd(), 'data', folderName);
  const files = await fs.readdir(filePath);
  const sqlFiles = files.filter((f) => f.endsWith('.sql'));
  const queries = {};
  for (const sqlfile of sqlFiles) {
    const query = fs.readFileSync(join(filePath, sqlfile), {
      encoding: 'UTF-8',
    });
    queries[sqlfile.replace('.sql', '')] = query;
  }
  return queries;
};

const generateJWT = (data) => {
  const token = jwt.sign(
    { ...data },
    process.env.SECRET_JWT_KEY
  );

  return token;
};

module.exports = {
  loadSqlQueries,
  generateJWT
};
