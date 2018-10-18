var db = require('./upload-data.model');

module.exports.insertDocuments = function(path, callback) {
    console.log("path : " + path);
    db.create({'filePath': path}, callback);
}