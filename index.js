const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const path = require("path");

const db = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

// db.connect((err) => {
//   if (err) {
//     console.log("No connection");
//     throw err;
//   }

//   console.log("Connected...");
// });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/")));
app.use(express.urlencoded({ extended: false }));

app.use("/timetable", require("./routes/timetableRoutes"));
app.use("/couriers", require("./routes/courierRoutes"));
app.use("/destinations", require("./routes/destinationRoutes"));

app.get("/", (req, res) => {
  let sql = "SELECT * FROM courier";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("meep");
      console.log(err);
      throw err;
    }
    console.log(result);
  });

  res.sendFile(path.join(__dirname, ".", "index.html"));
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
