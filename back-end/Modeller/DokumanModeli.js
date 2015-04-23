var mongoose = require('mongoose');

var DokumanModeli = new mongoose.Schema({
    dokumanTuru : String,
    icerik : [{dosyaAdi : String, dosyaLinki : String}],
    degistiren: String,
    firmaKodu:String
});

module.exports = mongoose.model('dokumanTanimi', DokumanModeli);
