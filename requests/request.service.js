var database = require('./request.model')

module.exports = {
    addData : function(data, callback){
        database.create(data, callback);
    },
    deleteData : function(id, callback){
        var query = {'_id': id};
        database.remove(query, callback);
    },
    getData : function(callback, limit){
        database.find(callback).limit(limit);
    },
    searchData : function(req, callback, limit){
        var input = escapeRegExp(req.query.key);
        var key = new RegExp(input, "i");
        input = escapeRegExp(req.query.fak);
        var fak = new RegExp(input, "i");
        input = escapeRegExp(req.query.dep);
        var dep = new RegExp(input, "i");

        var query = { $and: [
            {"item.fakultas": {$regex: fak}},
            {"item.departemen": {$regex: dep}}, 
            {$or: [
                {"item.file_name": {
                    $regex: key
                }},
                {"item.title": {
                    $regex: key
                }}]}
            ]
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
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}