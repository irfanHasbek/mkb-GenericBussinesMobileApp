var express = require('express');
var VersionModeli = require('../Modeller/VersionModel');

function CRUD(model){
    var router = express.Router();
    router.post('/listele', function(req, res) {
        var firmaKodu = req.body.firmaKodu;
        console.log('firmaKodu : ' + firmaKodu);
        model.find({firmaKodu : firmaKodu}, function(dbHatasi, listelenen) {
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

    router.post('/ekle', function(req, res){  
        var modelObject = new model(req.body);
        modelObject.save(function(dbHatasi, eklenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
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
                        res.send({state : true, data : eklenen});
                    });
                });
            }
        });
    });
    //coklu resim iceren objeler
    router.post('/cokluekle', function(req, res){  
        var temp = req.body;
        temp.fotograflar = JSON.parse(req.body.fotograflar);
        var modelObject = new model(temp);
        //console.log(JSON.stringify(modelObject));
        modelObject.save(function(dbHatasi, eklenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
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
                        res.send({state : true, data : eklenen});
                    });
                });
            }
        });
    });
    
    router.get('/hepsinisil', function(req, res) {
        model.remove({}, function(dbHatasi) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
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
                        res.send({state : true, data : "Tumu silindi."});
                    });
                });
            }
        });
    });
    
    router.post('/sil', function(req, res) {
        //console.log(JSON.stringify(req.body));
        model.remove(req.body, function(dbHatasi) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
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
                        res.send({state : true, data : "Veri silindi."});
                    });
                });
            }
        });
    });
    
    router.post('/getir', function(req, res) {
        //console.log(JSON.stringify(req.body));
        model.findOne(req.body, function(dbHatasi, getirilen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : getirilen});
            }
        });
    });
    
    router.post('/guncelle', function(req, res) {
        //console.log(JSON.stringify(req.body));
        model.update({_id : req.body._id}, req.body, function(dbHatasi, etkilenenSatir) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
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
                        res.send({state : true, data : etkilenenSatir});
                    });
                });
            }
        });
    });
    /*
        CityModel.update({_id: city._id},{$pushAll : newTown},function(err, town){     
    */
    router.post('/arrayekle', function(req, res) {
        //console.log(JSON.stringify(req.body.arrayItem));
        model.update({_id : req.body._id}, {$pushAll : JSON.parse(req.body.arrayItem)}, function(dbHatasi, etkilenenSatir) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
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
                        res.send({state : true, data : etkilenenSatir});
                    });
                });
            }
        });
    });
    
    /*
        //{$pull :{ towns : {townName : resp.townName}}    
    */
    router.post('/arraysil', function(req, res) {
        //console.log(JSON.stringify(req.body.arrayItem));
        model.update({_id : req.body._id}, {$pull : req.body.arrayItem}, function(dbHatasi, etkilenenSatir) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
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
                        res.send({state : true, data : etkilenenSatir});
                    });
                });
            }
        });
    });
    return router;
}
module.exports = CRUD;
