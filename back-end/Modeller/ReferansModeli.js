var mongoose = require('mongoose');

var ReferansModeli = new mongoose.Schema({
    projeYeri : String,
    bayi: String,
    kullanilanUrun: String,
    aciklama: String,
    fotograf: [{link : String}],
    firmaKodu:String
});

module.exports = mongoose.model('referanslar', ReferansModeli);
