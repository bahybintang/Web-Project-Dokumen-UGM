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
    }
});
dbSchema.index({file_name:'text', fakultas:'text', title:'text', url: 'text'});

const database = module.exports = mongoose.model('file_data', dbSchema, 'file_data');

module.exports.getData = function(callback, limit){
    database.find(callback).limit(limit);
}

module.exports.addData = function(data, callback){
    database.create(data, callback);
}

module.exports.getDataById = function(id, callback){
    var query = {'_id': id};
    database.findById(query, callback);
}

module.exports.deleteData = function(id, callback){
    var query = {'_id': id};
    database.remove(query, callback);
}

module.exports.updateData = function(id, data, options, callback){
    var query = {'_id': id};
    var update = {
        file_name: data.file_name,
        url: data.url,
        fakultas: data.fakultas,
        title: data.title
    };
    database.findByIdAndUpdate(query, update, options, callback);
}

module.exports.getPage = function(req, callback){
    var _page = req.query._page;
    var _page_len = req.query._page_len;
    database.find(callback).skip(_page_len*(_page-1)).limit(_page_len-0);
}

module.exports.searchData = function(req, callback, limit){
    var key = new RegExp(req.query.key, "i");
    console.log(key);
    var query = { $or: [{
        fakultas: {
            $regex: key
        }},
        {file_name: {
            $regex: key
        }},
        {title: {
            $regex: key
        }}]
    };

    if(req.query._page === null && req.query._page_len === null){
        database.find(query, callback).limit(limit);
    }
    else{
        var _page = req.query._page;
        var _page_len = req.query._page_len;
        database.find(query, callback).skip(_page_len*(_page-1)).limit(_page_len-0);
    }
    
}

// OLD SEARCH
// module.exports.searchData = function(key, callback, limit){
//     key = new RegExp(key, "i");
//     console.log(key);
//     var query = { $or: [{
//         fakultas: {
//             $regex: key
//         }},
//         {file_name: {
//             $regex: key
//         }},
//         {title: {
//             $regex: key
//         }}]
//     };
//     database.find(query, callback).limit(limit);
// }