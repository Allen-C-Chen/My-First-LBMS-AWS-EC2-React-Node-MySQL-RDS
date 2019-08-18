var mysql = require('mysql');
var config = require('./config.json');

var connection = mysql.createConnection({
    host     : config.dbhost,
    user     : config.dbuser,
    password : config.dbpassword,
    database : config.dbname
});

module.exports = connection;