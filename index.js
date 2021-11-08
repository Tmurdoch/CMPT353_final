var mysql = require('mysql');
var express = require('express');
const { response } = require('express');

var app = express();
var port  = process.env.PORT || 8005;
var responseStr = "MySQL Data:";



//load the webpage, display all posts
app.get('/', (req, res) => {
    console.log("got a request");


    console.log('MySQL Connection config:');

    var connection = mysql.createConnection({
        host: "353-app",
        port: '3306',
        user: "user",
        password: "pass",
        database: "db"
    });

    //var queryStr = SELECT * FROM DB_ITEM_T;

    connection.connect();

    connection.query(queryStr, (error, results, fields) => {
        if (error){throw error;}

        responseStr = '';

        results.forEach((data) => {
            responseStr += data.ITEM_NAME + ' : ';
            console.log(data);
        });

        if (responseStr.length == 0)
            responseStr = 'No records found';

        console.log(responseStr);

        res.status(200).send(responseStr);
    });

    connection.end();

});

app.listen(port, () => {
    console.log('mySQL app listening on port ' + port);
})