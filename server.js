var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000))

var con = (process.env.connectionString || require('./config.json').connectionString)

mongoose.connect(con,
    {
        reconnectTries: 100,
        reconnectInterval: 500,
        autoReconnect: true,
        useNewUrlParser: true
    }, function (err, db) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Database connected!")
        }
    })

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + '/client/build'))

// users handling route
app.use('/users', require('./users/users.controller'))

app.use('/api/request', require('./requests/request.controller'))

app.use('/api', [require('./upload-data/upload-data.controller'), require('./data/database.controller')])

app.use(require('./_helpers/error-handler'))

app.get(['/', '/login', '/user', './request'], (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

app.get(['/admin'], (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/404.html')
})

app.listen(app.get('port'), function () {
    console.log("listening on port " + app.get('port') + "...")
})