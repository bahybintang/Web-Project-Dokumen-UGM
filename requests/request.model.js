var mongoose = require('mongoose');

const dbSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    item: {
        _id: {
            type: String,
            required: false   
        },
        url: {
            type: String,
            required: true   
        },
        file_name: {
            type: String,
            required: true  
        },
        fakultas: {
            type: String,
            required: false  
        },
        title: {
            type: String,
            required: true  
        },
        departemen: {
            type: String,
            required: false
        }
    }
});
dbSchema.index({
    date: 1,
    username:'text', 
    type:'text',
    item: {
        _id: 'text',
        url: 'text',
        file_name: 'text',
        fakultas: 'text',
        title: 'text',
        departemen: 'text'
    } 
});

const database = module.exports = mongoose.model('requests', dbSchema, 'requests');