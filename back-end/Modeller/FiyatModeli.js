var mongoose = require('mongoose');

var FiyatModeli = new mongoose.Schema({
    urunFiyatGrubu : String,
    icerik : [{dosyaAdi : String, dosyaLinki : String}],
    degistiren: String,
    firmaKodu:String
});

module.exports = mongoose.model('fiyatModeli', FiyatModeli);
