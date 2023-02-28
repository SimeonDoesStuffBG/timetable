const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM courier";
  db.query(sql, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});
