//
// Module imports
//
const express = require("express");
const hbs = require("handlebars");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

//
// Create new express app.
//
const app = express();
const port = process.argv[2] || 8910
app.set("port", port)


app.use(express.static(path.join(__dirname, "public")));


//
// Connecting router(s)
//
app.get("/", function (req, res) {

  index_path = path.resolve(__dirname, "../public/index.html");
 
  res.status(200).sendFile(index_path);
});


function get_data(req, res) {

  // Resolve path to db.
  db_path = path.resolve(__dirname, "./db/contact.db");

  // Opening db.
  let db = new sqlite3.Database(db_path, (err) => {

      if (err) {
          console.error(err.message);
          res.status(500).send("Unable to retrieve users.");
          return
      }

  });

  var people = [];

  // Query the database for each person.
  db.serialize(() => {
      db.all(`SELECT * FROM people`, (err, person) => {
          if (err) {
              console.error(err.message);
              return
          }
          // Setting variables used in data arrangement.
          person.forEach((onePerson) => {
          pid = onePerson.pid;
          is_inf = onePerson.is_inf;

          var color;
          if (is_inf) {
              color = "#f00";
          } else {
              color = "#00f";
          }

          // Arranging data into correct format.
          person_data = {id: "n" + pid,
                         label: onePerson.name,
                         x: 1,
                         y: 1,
                         size: 1,
                         color: color};

          // Pushing to the people array.
          people.push(person_data);
        })

          //
          // Nested
          //

          var infect_conn = [];

          // Query the database for each connection.
          db.serialize(() => {
              db.all(`SELECT * FROM infect_conn`, (err, single_conn) => {
                  if (err) {
                      console.error(err.message);
                      return
                  }
                  single_conn.forEach((single) => {
                  // Setting variables used in data arrangement.
                  cid = single.cid;
                  p1_id = single.p1_id;
                  p2_id = single.p2_id;

                  // Arranging data into correct format.
                  single_data = {id: "e" + cid,
                                      source: "n" + p1_id,
                                      target: "n" + p1_id,
                                      color: "#088"}

                  // Pushing to the infect_conn array.
                  infect_conn.push(single_data);
                  
                })
                  //console.log(single_conn_data);
                  let result = {nodes: people, edges: infect_conn}
                  console.log(result)
                  res.send(result)
                  // Packing nodes and edges into a single object to send to the client.

                  
              });
          });
      });
  });
}


//
// getJason path.
//
app.get("/getJason", function (req, res) {
  get_data(req,res)
});


app.post("/postJason", function (req, res) {
  res.status(200);
});

//
//
//
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

//
//
//
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});


//
// Listen for requests on "port"
//
app.listen(port, () => console.log(`app listening at http://localhost:${port}`))
