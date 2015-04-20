var mongoose = require('mongoose');

var RolTanimiModeli = new mongoose.Schema({
    rol : String,
    degistiren: String,
    firmaKodu:String
});

module.exports = mongoose.model('rolTanimi', RolTanimiModeli);
