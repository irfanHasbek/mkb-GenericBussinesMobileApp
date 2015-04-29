var mongoose = require('mongoose');

var FirmaModeli = new mongoose.Schema({
    firmaKodu : String,
    unvan : String,
    resimLinki : String,
    email : String,
    sifre : String,
    yetkiliIsim : String,
    yetkiliGorev : String,
    yetkiliGsm : String,
    yetkiliEmail : String,
    iletisimAdres : String,
    iletisimIl : String,
    iletisimIlce : String,
    iletisimIsTel : String,
    iletisimFax : String,
    iletisimWebAdres : String
});

module.exports = mongoose.model('firma', FirmaModeli);
