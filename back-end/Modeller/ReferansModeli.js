var mongoose = require('mongoose');

var ReferansModeli = new mongoose.Schema({
    projeYeri : String,
    bayi: String,
    kullanilanUrun: String,
    aciklama: String,
    fotograflar: [{link : String}],
    firmaKodu:String,
    degistiren : String
});

module.exports = mongoose.model('referanslar', ReferansModeli);
