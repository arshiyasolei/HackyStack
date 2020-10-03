const express = require("express")
const middleware = require("../middleware.js")

//
// Creating router.
//
const router = express.Router();


//
// Root path.
//
router.get("/", middleware.middle,(req, res, next) => {
    res.sendFile("../index.html")
});

//
// Exporting router
//
module.exports = router;
