//
// Module imports
//
const express = require("express");
const hbs = require("handlebars");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");


//
// Database connection
//
const mysql = require("./dbcon.js");


//
// Create new express app.
//
const app = express();
const port = process.argv[2] || 8910
app.set("port", port)

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

//
// Logger function (displays all received requests to command line)
//
function logger(req, res, next) {
    console.log("Req: ", "--Method", req.method, "--URL:", req.url)
    next();
}
