var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// test login
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const cors = require('cors');
//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://bintang-db:Password1@ds047207.mlab.com:47207/project-one', 
    { reconnectTries: 100,
    reconnectInterval: 500,
    autoReconnect: true, 
    useNewUrlParser: true }, function(err, db){
    if(err){
        console.log(err);
    }
    else{
        console.log("Database connected!");
    }
});

var db = mongoose.connection;

app.use(express.static(__dirname + "/public"));

// Coba Login
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.get('/', function(req, res){
    res.send("Pake /api gan!");
});

app.use('/api', require('./data/database.controller'));

app.listen(3000, function(){
    console.log("listening port 3000...")
});