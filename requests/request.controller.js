var express = require('express');
var app = module.exports = express.Router();
var bodyParser = require('body-parser');
var DB = require('./request.service');
var jwt = require('../_helpers/jwt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var success = { success : true };
var fail = { success : false };

app.post('/add', jwt.user(), (req, res, next) => {
    DB.addData(req.body, function(err){
        if(err){
            next(err);
        }
        else{
            console.log("data added");
            res.status(200).json(success);
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
            res.status(200).json(success);
        }
        else{
            console.log("data not found!");
            res.status(404).json(fail);
        }
    });
});

app.get('/get', (req, res, next) => {
    DB.getData(function (err, data) {
        if (err) {
            next(err);
        }
        res.json(data);
    });
});

app.get('/search', (req, res, next) => {
    DB.searchData(req, function (err, data) {
        if (err) {
            console.log(err)
            next(err);
        }
        else {
            res.json(data);
        }
    });
});
