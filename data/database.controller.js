var express = require('express');
var app = module.exports = express.Router();
var bodyParser = require('body-parser');
var DB = require('./database.service');
var jwt = require('../_helpers/jwt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/add', jwt.user(), (req, res, next) => {
    DB.addData(req.body, function(err){
        if(err){
            next(err);
        }
        else{
            console.log("data added");
            res.status(200).end();
        }
    });
});

app.delete('/delete/:id', jwt.admin(), (req, res, next) => {
    DB.deleteData(req.params.id, function(err, data){
        if(err){
            next(err);
        }
        else if(data.n){
            console.log("data " + req.params.id + " deleted");
            res.status(200).end();
        }
        else{
            console.log("data not found!");
            res.status(404).end();
        }
    });
});

app.get('/get', (req, res, next) => {
    DB.getData(function(err, data){
        if(err){
            next(err);
        }
        res.json(data);
    });
});

app.get('/get/:id', (req, res, next) => {
    DB.getDataById(req.params.id, function(err, data){
        if(err){
            next(err);
        }
        res.json(data);
    });
});

app.post('/update/:id', jwt.user(), (req, res, next) => {
    DB.updateData(req.params.id, req.body, {}, function(err, data){
        if(err){
            next(err);
        }
        else if(data){
            console.log("data " + req.params.id + " updated!");
            res.status(200).end();
        }
        else{
            res.status(404).end();
        }
    });
});

// search/?key=val&_page=val&_page_len=val
// _page dan _page_len optional
app.get('/search', (req, res, next) => {
    DB.searchData(req, function(err, data){
        if(err){
            next(err);
        }
        else{
            res.json(data);
        }
    });
});

// /page/_page=val&_page_len=val
app.get('/page', (req, res, next) => {
    DB.getPage(req, function(err, data){
        if(err){
            next(err);
        }
        else if(!req.query._page || !req.query._page_len){
            res.status(400).end();
        }
        res.json(data);
    });
});
