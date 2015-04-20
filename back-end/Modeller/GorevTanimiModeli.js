var mongoose = require('mongoose');

var GorevTanimiModeli = new mongoose.Schema({
    gorev : String,
    degistiren: String,
    firmaKodu:String
});

module.exports = mongoose.model('gorevTanimi', GorevTanimiModeli);
