var mongoose = require('mongoose');

var VideoModeli = new mongoose.Schema({
    videoLinki : String,
    videoSaglayici : String,
    aktif : String,
    degistiren : String,
    firmaKodu:String
});

module.exports = mongoose.model('videoTanimi', VideoModeli);
