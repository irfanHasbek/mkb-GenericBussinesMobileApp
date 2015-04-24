var mongoose = require('mongoose');

var VersionModeli = new mongoose.Schema({
    mobilVersion : String,
    firmaKodu:String
});

module.exports = mongoose.model('versionTanimi', VersionModeli);
