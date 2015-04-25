var mongoose = require('mongoose');

var VideoModeli = new mongoose.Schema({
    videoLinki : String,
    supporter : String,
    degistiren : String,
    firmaKodu:String
});

module.exports = mongoose.model('videoTanimi', VideoModeli);
