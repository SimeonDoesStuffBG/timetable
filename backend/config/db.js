const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "containers-us-west-111.railway.app",
  port: "5992",
  user: "root",
  password: "V9Y14gINY2suaD2LrfdI",
  database: "railway",
});

module.exports = connection;
