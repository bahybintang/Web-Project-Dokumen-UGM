var database = require('./database.model');

module.exports = {
    getData : function(callback, limit){
        database.find(callback).limit(limit);
    },
    addData : function(data, callback){
        database.create(data, callback);
    },
    getDataById : function(id, callback){
        var query = {'_id': id};
        database.findById(query, callback);
    },
    deleteData : function(id, callback){
        var query = {'_id': id};
        database.remove(query, callback);
    },
    updateData : function(id, data, options, callback){
        var query = {'_id': id};
        database.findByIdAndUpdate(query, JSON.stringify(data), options, callback);
    },
    getPage : function(req, callback){
        var _page = req.query._page;
        var _page_len = req.query._page_len;
        database.find(callback).skip(_page_len*(_page-1)).limit(_page_len-0);
    },
    searchData : function(req, callback, limit){
        var key = new RegExp(req.query.key, "i");
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
}