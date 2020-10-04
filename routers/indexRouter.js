const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3").verbose();

//
// Creating router.
//
const router = express.Router();


function get_data(req, res) {

    // Resolve path to db.
    db_path = path.resolve(__dirname, "../db/contact.db");

    // Opening db.
    let db = new sqlite3.Database(db_path, (err) => {

        if (err) {
            console.error(err.message);
            res.status(500).send("Unable to retrieve users.");
        }

    });

    var people = [];

    // Query the database for each person.
    db.serialize(() => {
        db.each(`SELECT * FROM people`, (err, person) => {
            if (err) {
                console.error(err.message);
            }


            // Setting variables used in data arrangement.
            pid = person.pid;
            is_inf = person.is_inf;

            var color;
            if (is_inf) {
                color = "#f00";
            } else {
                color = "#00f";
            }

            // Arranging data into correct format.
            person_data = {id: "n" + pid,
                           label: person.name,
                           x: 1,
                           y: 1,
                           size: 1,
                           color: color};

            // Pushing to the people array.
            people.push(person_data);


            //
            // Nested
            //

            var infect_conn = [];

            // Query the database for each connection.
            db.serialize(() => {
                db.each(`SELECT * FROM infect_conn`, (err, single_conn) => {
                    if (err) {
                        console.error(err.message);
                    }

                    // Setting variables used in data arrangement.
                    cid = single_conn.cid;
                    p1_id = single_conn.p1_id;
                    p2_id = single_conn.p2_id;

                    // Arranging data into correct format.
                    single_conn_data = {id: "e" + cid,
                                        source: "n" + p1_id,
                                        target: "n" + p1_id,
                                        color: "#088"}

                    // Pushing to the infect_conn array.
                    infect_conn.push(single_conn_data);

                    //console.log(single_conn_data);

                    // Packing nodes and edges into a single object to send to the client.
                    var result = {nodes: people,
                                  edges: infect_conn}

                    console.log(result)
                    // Close db because we respect the documentation.

                    res.send(result)

                    
                });
            });
        });
    });
}



















//
// Root path.
//
router.get("/", function (req, res, next) {
    get_data(req,res)
});

//
// Exporting router
//
module.exports = router;
