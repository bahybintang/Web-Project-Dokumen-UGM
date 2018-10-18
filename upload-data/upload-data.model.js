var mongoose = require('mongoose');

const dbSchema = mongoose.Schema({
    filePath: {
        type: String,
        required: true
    }
});

const database = module.exports = mongoose.model('files', dbSchema, 'files');