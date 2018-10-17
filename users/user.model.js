const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    admin: { type: Boolean, default: false, set: function (val) { return false; }}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);