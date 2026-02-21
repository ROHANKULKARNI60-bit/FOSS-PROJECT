const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Foss-proj',
  password: 'arsenal',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection.promise();