var mongoose = require('mongoose');

var EgitimTakvimiModeli = new mongoose.Schema({
    tarih : String,
    yer : String,
    konu:String,
    degistiren: String,
    firmaKodu:String
});

module.exports = mongoose.model('egitim_takvimi', EgitimTakvimiModeli);
