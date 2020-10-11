var mysql = require('mysql');
var express = require("express");
var bodyParser = require("body-parser");
var Cookies = require('cookies')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');
const app = express();
const path = require('path');
const router = express.Router();

//PUG viewengine set up
const pug = require('pug');
const { async } = require('regenerator-runtime');
const objectAssign = require('object-assign');
const { url } = require('inspector');
//app.set('views', path.join(__dirname, 'node'));
app.set('view engine', 'pug');
app.set('views', [path.join(__dirname, 'views'),
    path.join(__dirname, 'views/pages/'), 
    path.join(__dirname, 'views/series/')]);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Start connecting to MySQL database (LOCAL)

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
});

/*
// Start connecting to MySQL database (ONLINE)
var con = mysql.createConnection({
    host: "db4free.net",
    user: "logicth",
    password: "p59jezakon",
    database: "dezurstva1"
});
*/

app.listen(process.env.PORT || 3000);
console.log("Server started!")


// Only activate the code (CREATE UNIQUE INDEX) on line 68 if it's the first time creating the database table.

//if database mydb exists, ignore database creation
let createMydb = "CREATE DATABASE if not exists mydb"
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
        console.log("Database OK (Already exists, will not create new one)");
});

//if table person exists, ignore table creation
let createTable = `CREATE TABLE if not exists pranja
    (id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        number INT,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(number))`;
con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table OK (Already exists, will not create new one)");
    console.log("Connected. Listening for value input into database.");
    if (err) throw err;
});

// Gets index.pug and renders it

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/views/pages/index'));
    //__dirname : This will resolve to your project folder.
});
