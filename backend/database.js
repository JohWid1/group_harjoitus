const mysql = require('mysql2');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'harjoitususer',
  password: 'harjoituspass',
  database: 'harjoitus'
});
module.exports = connection;