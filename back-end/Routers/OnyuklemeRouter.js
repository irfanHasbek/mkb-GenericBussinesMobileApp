var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');
var RolTanimiModeli = require('../Modeller/RolTanimiModeli');

function yoneticiOlustur(){
    return {
        firmaKodu : 'Yönetici',
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

function OnyuklmemeRouter(){
    var router = express.Router();
    router.get('/yoneticiekle', function(req, res){
        new KullaniciModeli(yoneticiOlustur()).save(function(dbHatasi, eklenen){
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
    
    return router;
}
module.exports = OnyuklmemeRouter;
