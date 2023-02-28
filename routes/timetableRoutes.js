const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/", (req, res) => {
  let data = {
    courier: req.body.courier,
    destination: req.body.destination,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };

  const sql = `INSERT INTO timetable (courier, destination, startTime, endTime) VALUES ('${data.courier}', '${data.destination}', '${data.startTime}', '${data.endTime}')`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log("Added new Item");
    res.send(result);
  });
});

router.get("/", (req, res) => {
  const sql =
    "SELECT t.id, c.name as courier, d.name as destination, startTime, endTime FROM timetable as t, courier as c, destination as d WHERE c.id=t.courier AND d.id=t.destination";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
