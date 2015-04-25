var mongoose = require('mongoose');

var IletisimModeli = new mongoose.Schema({
    bayiAdi : String,
    email: String,
    telefon1: String,
    telefon2: String,
    gsm:String,
    fax:String,
    adres:String,
    degistiren:String,
    firmaKodu:String
});

module.exports = mongoose.model('iletisim', IletisimModeli);
