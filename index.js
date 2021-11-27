var mysql = require('mysql');
var express = require('express');
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

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

app.post('/login', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.pass);

})

app.post('/add_staff', (req, res) =>{
    var name = req.body.name;
    var address = req.body.address;


    var sql = "INSERT INTO staff (name, address) VALUES ?";
    var values = [[name, address]]
    connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log("INSERT ok");
    });
    res.send("ok");
});

app.post('/add_customer', (req, res) =>{
    var name = req.body.name;
    var address = req.body.address;


    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [[name, address]];
    connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log("INSERT ok");
    });
    res.send("ok");
});


app.get('/createTable', (req, res) => {

    connection.connect((err)=> {
        if (err) console.log(err);
        console.log("connected");
    });


    var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Table created");
    });
    res.send("table created");


    connection.end((err) => {
        if (err) console.log(err);
        console.log("off");
    });
})

app.get('/insert', (req, res) =>{
    var sql = "INSERT INTO staff (name, address) VALUES ('tom', '1234 lane lane')";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("INSERT ok");
    });
    res.send("ok");
})

app.get('/select', (req, res) => {
    var data = "";

    var sql = 'SELECT * FROM staff';
    connection.query(sql, (err, result) => {
        if (err) throw err;

        Object.keys(result).forEach((key) => {
            var row = result[key];
            console.log(row.name);
            console.log(row.address)
        });
    });
    
    res.send("ok");
});


app.use('/', express.static('pages'));
app.listen(PORT, HOST);