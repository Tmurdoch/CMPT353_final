var mysql = require('mysql');
var express = require('express');
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var PORT  = 8005;
var HOST = '0.0.0.0';
var responseStr = "MySQL Data:";

var connection = mysql.createConnection({
    host: "353_final_sql",
    port: 3306,
    user: "user",
    password: "pass",
    database: "db"
});


//handle button post request