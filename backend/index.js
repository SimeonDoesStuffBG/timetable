const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const client = require("./client");

const db = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

db.connect((err) => {
  if (err) throw err;

  console.log("Connected...");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ encoded: false }));
app.use("/timetable", require("./routes/timetableRoutes"));

app.get("/couriers", (req, res) => {
  const sql = "SELECT * FROM courier";
  db.query(sql, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

app.get("/destinations", (req, res) => {
  const sql = "SELECT * FROM destination";
  db.query(sql, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
