var mongoose = require('mongoose');

const dbSchema = mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    fakultas: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    departemen: {
        type: String,
        default: ''
    }
});
dbSchema.index({file_name:'text', fakultas:'text', title:'text', url: 'text', departemen: 'text'});

const database = module.exports = mongoose.model('file_data', dbSchema, 'file_data');