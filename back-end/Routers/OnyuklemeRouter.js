var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');
var RolTanimiModeli = require('../Modeller/RolTanimiModeli');
var VersionModeli = require('../Modeller/VersionModel');

function yoneticiOlustur(firmaKodu){
    return {
        firmaKodu : firmaKodu,
        isim : 'isim',
        soyisim : 'Soyisim',
        email : 'yonetici@yonetici.com',
        sifre : '1234',
        rol : 'Yönetici',
        gorev : '',
        gsm1 : '',
        gsm2 : '',
        resimLinki : '',
        hesapTipi : 'Yönetici',
        aktif : true,
        degistiren : 'Sistem'
    }
}

function rolOlustur(){
    return {
        rol : "Yönetici",
        degistiren: 'Sistem',
        firmaKodu:'Yönetici'   
    }
}

function versionOlustur(firma){
    return {
        mobilVersion : "1",
        firmaKodu:firma   
    }
}

function OnyuklmemeRouter(){
    var router = express.Router();
    router.get('/yoneticiekle', function(req, res){
        var firmaKodu = req.param('firmaKodu');
        new KullaniciModeli(yoneticiOlustur(firmaKodu)).save(function(dbHatasi, eklenen){
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : eklenen});
            }
        });
    });
    
    router.get('/rolekle', function(req, res){
        new RolTanimiModeli(rolOlustur()).save(function(dbHatasi, eklenen){
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : eklenen});
            }
        });
    });
    
    router.get('/firmaversionekle', function(req, res){
        var firma = req.param('firma');
        if(firma != ''){
            new VersionModeli(versionOlustur(firma)).save(function(dbHatasi, eklenen){
                if(dbHatasi) {
                    res.send({state : false, data : dbHatasi});
                    return;
                }
                else {
                    res.send({state : true, data : eklenen});
                }
            }); 
        }else{
            res.send("Firma unvani bulunamadi.");
        }   
    });
    
    return router;
}
module.exports = OnyuklmemeRouter;
