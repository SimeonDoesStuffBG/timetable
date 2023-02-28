const mysql = require("mysql2");

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
  password: "xcn7ItSXTaBJIgN0IRq4",
  database: "railway",
});

// const connection = mysql.createConnection({
// host: "localhost",
// user: "root",
// password: "",
// database: "codeItprojectDB",
// });

module.exports = connection;
