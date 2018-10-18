var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      var str = __dirname + "";
      var path = str.substr(0, str.length-8) + "public/files/uploads";
      cb(null, path)
    },
    filename: (req, file, cb) => {
      var ext = file.mimetype.split('/')[1];
      cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
});
const upload = module.exports = multer({storage: storage});