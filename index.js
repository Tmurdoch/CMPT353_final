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
    var email = req.body.email;
    var password = req.body.pass;

    var sql = "SELECT email, password FROM staff WHERE email = '" + email + "' AND password= '" + password + "'";
    

    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("QUERY ok")
        if (result == []) {
            location.reload();
        }
        else {
            if (email == "root@root.root") {
                res.writeHead(301, 
                    {Location: '/landing_root.html'});
                    res.end();
            }
            else {
                res.writeHead(301,
                    {Location: '/landing_staff.html'});
                    res.end();
            }
            }
    })

});

app.get('/search_customer/:search', (req, res) => {
    console.log(req.params);
    var sql = "SELECT * FROM customers WHERE name like '".concat(req.params.search + "'");
    

    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result))
        res.end();
    });

});

app.get('/show_all_customers', (req, res) => {
        //query the db and get customers back, display in html page for landing_staff somehow
        //TODO: have onclick to select from all customers?
        var sql = "SELECT * FROM customers";
        connection.query(sql, (err, result) =>{ 
            if (err) throw err;
            res.send(JSON.stringify(result))
            res.end()
        });
        
});

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
    var age = req.body.age;
    var date = req.body.date;
    var summary = req.body.summary;
    var other_info = req.body.other_info;


    var sql = "INSERT INTO customers (name, age, date, summary, other_info) VALUES ?";
    var values = [[name, age, date, summary, other_info]];
    connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log("INSERT ok");
    });
    
});

app.post('/delete_customer', (req, res) => {
    var name = req.body.search;

    var sql = "DELETE FROM customers WHERE name='" + name + "'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("DELETE ok");
    })
})

app.post('/update_customer', (req, res) => {
    console.log("update_customer called")
    var og_name = req.body.ogname;
    console.log(og_name);
    var name = req.body.name;
    var age = req.body.age;
    var date = req.body.date;
    var summary = req.body.summary;
    var other_info = req.body.other_info;
    //delete customer with name
    
    var sql_delete = "DELETE FROM customers WHERE name='" + og_name + "'";
    connection.query(sql_delete, (err, result) => {
        if (err) throw err;
        console.log("DELETE ok");
    });

    var sql_insert = "INSERT INTO customers (name, age, date, summary, other_info) VALUES ?";
    var values = [[name, age, date, summary, other_info]];
    connection.query(sql_insert, [values], (err, result) => {
        if (err) throw err;
        console.log("INSERT ok");
    });


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