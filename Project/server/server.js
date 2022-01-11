'use strict'

const express = require("express");
const app = express();

var mysql = require('mysql');

// creates necessary variables
const PORT = 8000;
const HOST = "0.0.0.0"
const panic = (err) => console.error(err);



var con = mysql.createConnection({
	host: 'localhost',
    user: 'root',
	password: 'root',
    port: '3306'
});


// creating the mysql database
con.connect((err) => {
    if (err) { throw(err); }
    console.log("database connected");
});


con.query("CREATE DATABASE IF NOT EXISTS cbopeople;", function (err, result) {
    if (err) throw err;
    console.log("database created");
});

con.query("USE cbopeople;", function (err, result) {
    if (err) throw err;
});

// staff posting
app.post('/staff.html', function(req, res) {    
    var peoplehelped = req.body.peoplehelped;
    var name = req.body.name;
    con.query(`UPDATE staff SET peoplehelped = '${peoplehelped}' WHERE name = '${name}';`, function (err, result) {
        if (err) throw err;
    });
})

app.post('/staffsubmit.html', function(req, res) { 
    var peoplehelped = req.body.peoplehelped;
    var name = req.body.name;   
    con.query(`INSERT INTO staff VALUES ('${name}', '${peoplehelped}');`, function (err, result) {
        if (err) throw err;
    });
})
app.post('/staffdelete.html', function(req, res) { 
    var name = req.body.name;   
    con.query(`DELETE FROM staff WHERE name = '${name}';`, function (err, result) {
        if (err) throw err;
    });
})


// members posting
app.post('/outreachmembers.html', function(req, res) {  
    var timeshelped = req.body.timeshelped;  
    var name = req.body.name;
    con.query(`UPDATE members SET timeshelped = '${timeshelped}' WHERE name = '${name}';`, function (err, result) {
        if (err) throw err;
    });
})
app.post('/memberdelete.html', function(req, res) {    
    var name = req.body.name;
    con.query(`DELETE FROM members WHERE name = '${name}';`, function (err, result) {
        if (err) throw err;
    });
})
app.post('/membersubmit.html', function(req, res) {    
    var timeshelped = req.body.timeshelped;  
    var name = req.body.name;
    con.query(`INSERT INTO members VALUES ('${name}', '${timeshelped}');`, function (err, result) {
        if (err) throw err;
    });
})


app.post('/reports.html', function(req, res) {  
    var membername = req.body.membername;  
    con.query(`SELECT * FROM reports WHERE name = '${membername}';`, function (err, result) {
        if (err) throw err;
    });
})
app.post('/reportsubmit.html', function(req, res) {   
    var membername = req.body.membername;  
    var report = req.body.report;
    var staffname = req.body.staffname; 
    con.query(`INSERT INTO reports VALUES ('${staffname}', '${membername}'', '${report}');`, function (err, result) {
        if (err) throw err;
    });
})


app.use('/', express.static('pages'));
app.listen(PORT,HOST);
console.log("up and running");
