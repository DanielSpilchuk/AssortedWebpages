'use strict'

const express = require("express");
const app = express();

var util = require('util');
var encoder = new util.TextEncoder('utf-8');

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:8000";

// creates necessary variables
const PORT = 8000;
const HOST = "0.0.0.0"
const panic = (err) => console.error(err);

// creating the mongo database
MongoClient.connect(url, function(err,db) {
    if (err) { throw(err); }
    console.log("database connected");
    db.close();
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("people", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
});


// staff posting
app.post('/staff.html', function(req, res) {    
    
    var namein = req.body.name;
    var peoplehelpedin = req.body.peoplehelped;
    var positionin = "staff";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: namein, peoplehelped: peoplehelpedin, position: positionin };
        dbo.collection("people").updateOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("document updated");
        db.close();
        });
    });
})

app.post('/staffsubmit.html', function(req, res) {    
    
    var namein = req.body.name;
    var peoplehelpedin = req.body.peoplehelped;
    var positionin = "staff";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: namein, peoplehelped: peoplehelpedin, position: positionin };
        dbo.collection("people").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("document inserted");
        db.close();
        });
    });
})

app.post('/staffdelete.html', function(req, res) { 
    
    var namein = req.body.name;
    var peoplehelpedin = req.body.peoplehelped;
    var positionin = "staff";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: namein, peoplehelped: peoplehelpedin, position: positionin };
        dbo.collection("people").deleteOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("document deleted");
        db.close();
        });
    });
})


// members posting
app.post('/outreachmembers.html', function(req, res) {  
    var timeshelpedin = req.body.timeshelped;      
    var namein = req.body.name;
    var reportin = req.body.report;    
    var positionin = "member";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: namein, timeshelped: timeshelpedin, report: reportin, position: positionin};
        dbo.collection("people").updateOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("document updated");
        db.close();
        });
    });
})
app.post('/memberdelete.html', function(req, res) {    
    var namein = req.body.name;
    var timeshelpedin = req.body.timeshelped;      
    var reportin = req.body.report;    
    var positionin = "member";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: namein, timeshelped: timeshelpedin, report: reportin, position: positionin};
        dbo.collection("people").deleteOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("document deleted");
        db.close();
        });
    });
})
app.post('/membersubmit.html', function(req, res) {    
    var namein = req.body.name;
    var timeshelpedin = req.body.timeshelped;  
    var reportin = req.body.report;    
    var positionin = "member";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: namein, timeshelped: timeshelpedin, report:reportin, position: positionin };
        dbo.collection("people").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("document created");
        db.close();
        });
    });
})


app.post('/reports.html', function(req, res) {  
    var namein = req.body.name;
    var timeshelpedin = req.body.timeshelped;  
    var reportin = req.body.report;    
    var positionin = "member";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: namein, timeshelped: timeshelpedin, report:reportin, position: positionin };
        dbo.collection("people").findOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("document found");
        db.close();
        });
    });
})
app.post('/reportsubmit.html', function(req, res) {   
    var namein = req.body.name;
    var timeshelpedin = req.body.timeshelped;  
    var reportin = req.body.report;    
    var positionin = "member";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: namein, timeshelped: timeshelpedin, position: positionin, report:reportin };
        dbo.collection("people").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("document created");
        db.close();
        });
    });
})


app.use('/', express.static('pages'));
app.listen(PORT,HOST);
console.log("up and running");
