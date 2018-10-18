var express = require('express');
var router = module.exports = express.Router();
var upload = require('../_helpers/file-uploader');
var db = require('./upload-data.service');

router.post('/upload', upload.single('image'), function(req, res, next){
    console.log(req.file);
    console.log(req.file.filename);
    db.insertDocuments('public/files/uploads/' + req.file.filename, function(err){
        if(err){
            next(err);
        }
        else{
            console.log("file uploaded");
            res.status(200).end();
        }
    });
});