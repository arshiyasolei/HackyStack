const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3").verbose();

//
// Creating router.
//
const router = express.Router();


router.get("/", function (req, res) {

    index_path = path.resolve(__dirname, "../public/index.html");
   
    res.status(200).sendFile(index_path);
});

//
// Exporting router
//
module.exports = router;
