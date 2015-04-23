var mongoose = require('mongoose');

var UrunModeli = new mongoose.Schema({
    urunGrubu : String,
    icerik : [{dosyaAdi : String, dosyaLinki : String}],
    degistiren: String,
    firmaKodu:String
});

module.exports = mongoose.model('urunModeli', UrunModeli);
