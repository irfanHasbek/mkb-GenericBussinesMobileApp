var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');

function Hesap(){
    var router = express.Router();
    router.post('/giris', function(req, res) {
        var firmaKodu = req.body.firmaKodu, email = req.body.email, sifre = req.body.sifre;
        KullaniciModeli.findOne({firmaKodu : firmaKodu, email : email, sifre : sifre, aktif : true}, function(dbHatasi, kullanici) {
            console.log(kullanici);
            if(dbHatasi || !kullanici) {
                req.session.giris = false;
                req.session.mesaj = 'Hatali kullanici adi veya sifre.';
                res.send({state : false, data : req.session.mesaj});
                return;
            }
            req.session.giris = true;
            req.session.kullanici = kullanici;
            res.redirect('/html/anasayfa_firma');
        });
    });
    
    router.get('/cikis', function(req, res){
        req.session.destroy();
        // cookie based session destroy
        req.session = null;
        res.redirect('/');
    }); 
    
    return router;
}
module.exports = Hesap;
