var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project'
});

connection.connect();

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// open ejs file

app.get('/result', function (req, res) {
    res.render('index');
});

app.post('/result', function (req, res) {

    var rno = parseInt(req.body.rno);
    var name = req.body.name;
    var sub_1 = parseInt(req.body.sub_1);
    var sub_2 = parseInt(req.body.sub_2);
    var sub_3 = parseInt(req.body.sub_3);
    var sub_4 = parseInt(req.body.sub_4);
    var sub_5 = parseInt(req.body.sub_5);

    var total = sub_1 + sub_2 + sub_3 + sub_4 + sub_5;

    var avg = total / 5;

    var cnt = 0;
    var results = "";

    if (sub_1 < 35) {
        cnt++;
    }

    if (sub_2 < 35) {
        cnt++;
    }

    if (sub_3 < 35) {
        cnt++;
    }

    if (sub_4 < 35) {
        cnt++;
    }

    if (sub_5 < 35) {
        cnt++;
    }

    if (cnt == 0) {
        results = "PASS";
    }
    else if (cnt < 3) {
        results = "ATKT";
    }
    else {
        results = "FAIL";
    }


    var sql = "INSERT INTO `students`(`rno`, `name`, `sub_1`, `sub_2`, `sub_3`, `sub_4`, `sub_5`,`total`, `avg`, `result`) VALUES (' " + rno + " ',' " + name + " ',' " + sub_1 + " ',' " + sub_2 + " ',' " + sub_3 + " ',' " + sub_4 + " ',' " + sub_5 + " ', ' " + total + " ', ' " + avg + " ', '"+results+"')"

    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });

    res.redirect('/result');   // get redirect
});

app.listen(7000);