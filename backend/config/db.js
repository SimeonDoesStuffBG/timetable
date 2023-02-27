const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "containers-us-west-95.railway.app",
  port: "5885",
  user: "root",
  password: "jMJW6COyW71SeqCGurLZ",
  database: "railway",
});

module.exports = connection;
