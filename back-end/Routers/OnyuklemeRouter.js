var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');
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
        resimLinki : String,
        hesapTipi : 'Yönetici',
        aktif : true   
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
    
    return router;
}
module.exports = OnyuklmemeRouter;
