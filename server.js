var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3000));

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

// users handling route
app.use('/users', require('./users/users.controller'));

app.get('/', function(req, res){
    res.send("Pake /api or /user gan!");
});

app.use('/api', [require('./upload-data/upload-data.controller'), require('./data/database.controller')]);

app.use(require('./_helpers/error-handler'));

app.listen(app.get('port'), function(){
    console.log("listening on port "+ app.get('port') + "...");
});