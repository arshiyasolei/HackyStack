const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3").verbose();

//
// Creating router.
//
const router = express.Router();


router.post("/", function (req, res) {
    res.status(200).send("./public/index.html");
});

//
// Exporting router
//
module.exports = router;
