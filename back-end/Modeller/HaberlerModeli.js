var mongoose = require('mongoose');

var HaberModeli = new mongoose.Schema({
    haberAdi : String,
    aciklama : String,
    fotografLinki : String,
    haberLinki : String,
    tarih : Date,
    degistiren: String,
    firmaKodu:String
});

module.exports = mongoose.model('haberModeli', HaberModeli);
