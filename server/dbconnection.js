var mysql = require("mysql");
var connection = mysql.createPool({
  
  host: "localhost",
  port: 3336,
  user: "root",
  password: "mohendra",
  database: "ng_auth",
  connectionLimit: 1000,
  multipleStatements: true,

});
module.exports = connection;
