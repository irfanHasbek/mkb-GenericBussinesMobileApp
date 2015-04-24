var mongoose = require('mongoose');

var YapilmisEgitimlerModeli = new mongoose.Schema({
    baslik : String,
    aciklama :String,
    dosyaLinki:String,
    tarih:String,
    degistiren: String,
    firmaKodu:String
});

module.exports = mongoose.model('yapimis_egitimler', YapilmisEgitimlerModeli);
