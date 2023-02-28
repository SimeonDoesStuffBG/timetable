const mysql = require("mysql2");

// const connection = mysql.createConnection({
// host: "containers-us-west-95.railway.app",
// port: "5885",
// user: "root",
// password: "jMJW6COyW71SeqCGurLZ",
// database: "railway",
// });

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

// const connection = mysql.createConnection({
// host: "localhost",
// user: "root",
// password: "",
// database: "codeItprojectDB",
// });

module.exports = connection;
