var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
DB = require('./models/database');

// test login
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const cors = require('cors');
//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://bintang-db:Password1@ds047207.mlab.com:47207/project-one');

var db = mongoose.connection;

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.send("Pake /api gan!");
});

app.post('/api/add', (req, res) => {
    DB.addData(req.body, function(err){
        if(err){
            throw err;
        }
        else{
            console.log("data added");
            res.status(200).end();
        }
    });
});

app.delete('/api/delete/:id', (req, res) => {
    DB.deleteData(req.params.id, function(err){
        if(err){
            throw err;
            
        }
        else{
            console.log("data deleted");
            res.status(200).end();
        }
    });
});

app.get('/api/get', (req, res) => {
    DB.getData(function(err, data){
        if(err){
            throw err;
            
        }
        res.json(data);
    });
});

app.get('/api/get/:id', (req, res) => {
    DB.getDataById(req.params.id, function(err, data){
        if(err){
            throw err;
            
        }
        res.json(data);
    });
});

app.post('/api/update/:id', (req, res) => {
    DB.updateData(req.params.id, req.body, {}, function(err){
        if(err){
            throw err;
            
        }
        else{
            console.log("data " + req.params.id + " updated!");
        }
    });
});

// search/?key=val&_page=val&_page_len=val
// _page dan _page_len optional
app.get('/api/search', (req, res) => {
    DB.searchData(req, function(err, data){
        if(err){
            throw err;
        }
        res.json(data);
    });
});

// /page/_page=val&_page_len=val
app.get('/api/page', (req, res) => {
    DB.getPage(req, function(err, data){
        if(err){
            throw err;
        }
        res.json(data);
    });
});

// Coba Login
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.listen(3000, function(){
    console.log("listening port 3000...")
});