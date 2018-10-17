var express = require('express');
var app = module.exports = express.Router();
var bodyParser = require('body-parser');
var DB = require('./database.service');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/add', (req, res) => {
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

app.delete('/delete/:id', (req, res) => {
    DB.deleteData(req.params.id, function(err){
        if(err){
            throw err;
            
        }
        else{
            console.log("data " + req.params.id + " deleted");
            res.status(200).end();
        }
    });
});

app.get('/get', (req, res) => {
    DB.getData(function(err, data){
        if(err){
            throw err;
            
        }
        res.json(data);
    });
});

app.get('/get/:id', (req, res) => {
    DB.getDataById(req.params.id, function(err, data){
        if(err){
            throw err;
            
        }
        res.json(data);
    });
});

app.post('/update/:id', (req, res) => {
    DB.updateData(req.params.id, req.body, {}, function(err){
        if(err){
            throw err;
            
        }
        else{
            console.log("data " + req.params.id + " updated!");
            res.status(200).end();
        }
    });
});

// search/?key=val&_page=val&_page_len=val
// _page dan _page_len optional
app.get('/search', (req, res) => {
    DB.searchData(req, function(err, data){
        if(err){
            throw err;
        }
        res.json(data);
    });
});

// /page/_page=val&_page_len=val
app.get('/page', (req, res) => {
    DB.getPage(req, function(err, data){
        if(err){
            throw err;
        }
        res.json(data);
    });
});
