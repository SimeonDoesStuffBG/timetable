const mysql = require("mysql");

// const connection = mysql.createConnection({
// host: "containers-us-west-95.railway.app",
// port: "5885",
// user: "root",
// password: "jMJW6COyW71SeqCGurLZ",
// database: "railway",
// });

const connection = mysql.createConnection({
  host: "containers-us-west-111.railway.app",
  user: "root",
  password: "V9Y14gINY2suaD2LrfdI",
  database: "railway",
});

// const connection = mysql.createConnection({
// host: "localhost",
// user: "root",
// password: "",
// database: "codeItprojectDB",
// });

module.exports = connection;
