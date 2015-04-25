var express = require('express');
var VersionModeli = require('../Modeller/VersionModel');

function CRUD(){
    var router = express.Router();
    router.post('/listele', function(req, res) {
        var firmaKodu = req.body.firmaKodu;
        console.log('firmaKodu : ' + firmaKodu);
        VersionModeli.find({firmaKodu : firmaKodu}, function(dbHatasi, listelenen) {
            if(dbHatasi) {
                res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
                res.send({state : false, data : dbHatasi});
                return;
            }
            else{
                res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
                res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
                res.send({state : true, data : listelenen});
            }
        });
    });

    router.post('/guncelle', function(req, res) {
        VersionModeli.findOne({firmaKodu : req.session.kullanici.firmaKodu}, function(dbVersionHatasi, bulunan){
            if(dbVersionHatasi){
                console.log(dbVersionHatasi);
                res.send({state : false, data : dbVersionHatasi});
                return;
            }
            var version = parseFloat(bulunan.mobilVersion);
            bulunan.mobilVersion = ++version;
            bulunan.save(function(dbHatasiKayit, kaydedilen){
                if(dbHatasiKayit){
                    res.send({state : false, data : dbHatasiKayit});
                    return;
                }
                res.send({state : true, data : kaydedilen});
            });
        });
    });
    
    return router;
}
module.exports = CRUD;
