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
        var input = escapeRegExp(req.query.key);
        var key = new RegExp(input, "i");
        input = escapeRegExp(req.query.filter);
        var filter = new RegExp(input, "i");
            
        var query = { $and: [
            {fakultas: {$regex: filter}}, 
            {$or: [
                {file_name: {
                    $regex: key
                }},
                {title: {
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
        
    },
    addDataBulk : async function(){
        var json = {"0":{"url":"http://mipa.ugm.ac.id/download/blanko/form-perpanjangan-studi-s1.doc","file_name":"form-perpanjangan-studi-s1.doc","title":"Form Perpanjangan Studi S1","fakultas":"mipa"},"1":{"url":"http://mipa.ugm.ac.id/download/blanko/Form-Permohonan-Rekomendasi.doc","file_name":"Form-Permohonan-Rekomendasi.doc","title":"Form Rekomendasi Exchange ke LN","fakultas":"mipa"},"2":{"url":"http://mipa.ugm.ac.id/download/blanko/form-cuti-s1.doc","file_name":"form-cuti-s1.doc","title":"Form Cuti S1","fakultas":"mipa"},"3":{"url":"http://mipa.ugm.ac.id/download/blanko/Form-Permohonan-SKA-Pensiunan.doc","file_name":"Form-Permohonan-SKA-Pensiunan.doc","title":"Form Permohonan SKA Pensiunan","fakultas":"mipa"},"4":{"url":"http://mipa.ugm.ac.id/download/blanko/form-aktif-kuliah-kembali.doc","file_name":"form-aktif-kuliah-kembali.doc","title":"Form Aktif Kuliah kembali","fakultas":"mipa"},"5":{"url":"http://mipa.ugm.ac.id/download/blanko/Form-Permohonan-SKA-Pegawai","file_name":"Form-Permohonan-SKA-Pegawai","title":"Form Pemrohonan SKA Pegawai Aktif","fakultas":"mipa"},"6":{"url":"http://mipa.ugm.ac.id/download/blanko/Form-Beasiswa-UGM.doc","file_name":"Form-Beasiswa-UGM.doc","title":"Form Beasiswa UGM","fakultas":"mipa"},"7":{"url":"http://mipa.ugm.ac.id/download/blanko/permohonan-kp.doc","file_name":"permohonan-kp.doc","title":"Form Permohonan KP/TA/PKL/Penelitian","fakultas":"mipa"},"8":{"url":"http://mipa.ugm.ac.id/download/blanko/Form-BOP.doc","file_name":"Form-BOP.doc","title":"Form BOP","fakultas":"mipa"},"9":{"url":"https://simpan.ugm.ac.id/s/t41T8mPaIUec9Lk","file_name":"t41T8mPaIUec9Lk","title":"Form Persyaratan Yudisium","fakultas":"mipa"},"10":{"url":"http://mipa.ugm.ac.id/download/blanko/Form-SKL-Sementara.doc","file_name":"Form-SKL-Sementara.doc","title":"Form SKL Sementara","fakultas":"mipa"},"11":{"url":"http://mipa.ugm.ac.id/download/blanko/Form-Permohonan-Passport-Visa.doc","file_name":"Form-Permohonan-Passport-Visa.doc","title":"Form Permohonan Visa/Paspor","fakultas":"mipa"},"12":{"url":"http://mipa.ugm.ac.id/download/blanko/ketentuan-penyerahan.pdf","file_name":"ketentuan-penyerahan.pdf","title":"Ketentuan Laporan Penelitian","fakultas":"mipa"},"13":{"url":"http://mipa.ugm.ac.id/download/blanko/Form-Permohonan-Ijin-Ruang.doc","file_name":"Form-Permohonan-Ijin-Ruang.doc","title":"Form Permohonan Ijin Ruang","fakultas":"mipa"},"14":{"url":"http://mipa.ugm.ac.id/fix/?file=kurikulum-s1-2016","file_name":"?file=kurikulum-s1-2016","title":"Panduan Akademik","fakultas":"mipa"},"15":{"url":"http://mipa.ugm.ac.id/download/blanko/form-perpanjangan-studi-s2-s3.doc","file_name":"form-perpanjangan-studi-s2-s3.doc","title":"Form Perpanjangan Studi S2-S3","fakultas":"mipa"},"16":{"url":"http://mipa.ugm.ac.id/download/blanko/form-cuti-s2-s3.doc","file_name":"form-cuti-s2-s3.doc","title":"Form Cuti S2 S3","fakultas":"mipa"},"17":{"url":"http://mipa.ugm.ac.id/download/BKD_DOSEN_VERS_21_MEI.zip","file_name":"BKD_DOSEN_VERS_21_MEI.zip","title":"Software BKD Mei 2013","fakultas":"mipa"}};
        for(var i = 0; i < Object.keys(json).length; i++){
            var jsonsend = {};
            jsonsend['url'] = json[i + ""]['url'];
            jsonsend['file_name'] = json[i + ""]['file_name'];
            jsonsend['fakultas'] = json[i + ""]['fakultas'];
            jsonsend['title'] = json[i + ""]['title'];
            await database.create(jsonsend, err => {
                return {message: err};
            });
        }
        return json;
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}