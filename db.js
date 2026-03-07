const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Foss-proj',
  password: process.env.db_password,
  database: 'FOSS',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection.promise();
