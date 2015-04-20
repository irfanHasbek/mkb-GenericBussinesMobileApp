var mongoose = require('mongoose');

var KullaniciModeli = new mongoose.Schema({
    firmaKodu : String,
    isim : String,
    soyisim : String,
    email : String,
    sifre : String,
    rol : String,
    gorev : String,
    gsm1 : String,
    gsm2 : String,
    resimLinki : String,
    hesapTipi : String,
    aktif : Boolean
});

module.exports = mongoose.model('kullanicilar', KullaniciModeli);
