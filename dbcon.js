mysql = require('mysql')
var pool = mysql.createPool({

    connectionLimit: 100,
    host:            '',
    user:            '',
    password:        '',
    database:        ''
});
