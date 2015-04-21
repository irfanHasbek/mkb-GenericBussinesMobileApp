var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');
var RolTanimiModeli = require('../Modeller/RolTanimiModeli');
var GorevTanimiModeli = require('../Modeller/GorevTanimiModeli');

function HTMLRouter(){
    var router = express.Router();
    router.get('/anasayfa_firma', function(req, res){
        req.session.currentPage = '/html/anasayfa_firma';
        req.session.pageLabel = 'anasayfa';
        res.render('anasayfa_firma', {layout : false, session : req.session});
    });
    
    router.get('/rol_tanimi', function(req, res){
        req.session.currentPage = '/html/rol_tanimi';
        req.session.pageLabel = 'kullanicilar';
        RolTanimiModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, roller){
            if(dbHatasi || !roller){
                res.send({state : false, data : dbHatasi});
                return;
            }
            res.render('rol_tanimi', {layout : false, session : req.session, roller : roller});
        });
    });
    
    router.get('/gorev_tanimi', function(req, res){
        req.session.currentPage = '/html/gorev_tanimi';
        req.session.pageLabel = 'kullanicilar';
        GorevTanimiModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, gorevler){
            if(dbHatasi || !gorevler){
                res.send({state : false, data : dbHatasi});
                return;
            }
            res.render('gorev_tanimi', {layout : false, session : req.session, gorevler : gorevler});
        });
    });
    
    router.get('/kullanici_tanimi', function(req, res){
        req.session.currentPage = '/html/kullanici_tanimi';
        req.session.pageLabel = 'kullanicilar';
        KullaniciModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasiKullanici, kullanicilar){
            if(dbHatasiKullanici || !kullanicilar){
                res.send({state : false, data : dbHatasiRoller});
                return;
            }
            RolTanimiModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasiRoller, roller){
                if(dbHatasiRoller || !roller){
                    res.send({state : false, data : dbHatasiRoller});
                    return;
                }
                GorevTanimiModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasiGorevler, gorevler){
                    if(dbHatasiGorevler || !gorevler){
                        res.send({state : false, data : dbHatasiGorevler});
                        return;
                    }
                    res.render('kullanici_tanimi', {layout : false, session : req.session, kullanicilar : kullanicilar, roller : roller, gorevler : gorevler});
                });
            });
        });
    });
    
    //Dokümanlar 
    
    router.get('/dokuman_ekle', function(req, res){
        req.session.currentPage = '/html/dokuman_ekle';
        req.session.pageLabel = 'dokumanlar';
        res.render('dokuman_ekle', {layout : false, session : req.session});
    });
    router.get('/dokuman_listele', function(req, res){
        req.session.currentPage = '/html/dokuman_listele';
        req.session.pageLabel = 'dokumanlar';
        res.render('dokuman_listele', {layout : false, session : req.session});
    });
    //Ürünler 
    
    router.get('/urun_ekle', function(req, res){
        req.session.currentPage = '/html/urun_ekle';
        req.session.pageLabel = 'urunler';
        res.render('urun_ekle', {layout : false, session : req.session});
    });
    router.get('/urun_listele', function(req, res){
        req.session.currentPage = '/html/urun_listele';
        req.session.pageLabel = 'urunler';
        res.render('urun_listele', {layout : false, session : req.session});
    });
    //Eğitim Takvimi 
    
    router.get('/egitim_takvimi_ekle', function(req, res){
        req.session.currentPage = '/html/egitim_takvimi_ekle';
        req.session.pageLabel = 'egitim_takvimi';
        res.render('egitim_takvimi_ekle', {layout : false, session : req.session});
    });
    router.get('/egitim_takvimi_listele', function(req, res){
        req.session.currentPage = '/html/egitim_takvimi_listele';
        req.session.pageLabel = 'egitim_takvimi';
        res.render('egitim_takvimi_listele', {layout : false, session : req.session});
    });
    
    //Fiyat 
    
    router.get('/fiyat_ekle', function(req, res){
        req.session.currentPage = '/html/fiyat_ekle';
        req.session.pageLabel = 'fiyat';
        res.render('fiyat_ekle', {layout : false, session : req.session});
    });
    router.get('/fiyat_listele', function(req, res){
        req.session.currentPage = '/html/fiyat_listele';
        req.session.pageLabel = 'fiyat';
        res.render('fiyat_listele', {layout : false, session : req.session});
    });
    //Referans 
    
    router.get('/referans_ekle', function(req, res){
        req.session.currentPage = '/html/referans_ekle';
        req.session.pageLabel = 'referans';
        res.render('referans_ekle', {layout : false, session : req.session});
    });
    router.get('/referans_listele', function(req, res){
        req.session.currentPage = '/html/referans_listele';
        req.session.pageLabel = 'referans';
        res.render('referans_listele', {layout : false, session : req.session});
    });
    //Yapılmış Eğitim 
    
    router.get('/yapilmis_egitim_ekle', function(req, res){
        req.session.currentPage = '/html/yapilmis_egitim_ekle';
        req.session.pageLabel = 'yapilmis_egitim';
        res.render('yapilmis_egitim_ekle', {layout : false, session : req.session});
    });
    router.get('/yapilmis_egitim_listele', function(req, res){
        req.session.currentPage = '/html/yapilmis_egitim_listele';
        req.session.pageLabel = 'yapilmis_egitim';
        res.render('yapilmis_egitim_listele', {layout : false, session : req.session});
    });
    //Haberler 
    
    router.get('/haber_ekle', function(req, res){
        req.session.currentPage = '/html/haber_ekle';
        req.session.pageLabel = 'haberler';
        res.render('haber_ekle', {layout : false, session : req.session});
    });
    router.get('/haber_listele', function(req, res){
        req.session.currentPage = '/html/haber_listele';
        req.session.pageLabel = 'haberler';
        res.render('haber_listele', {layout : false, session : req.session});
    });
    //İletişim 
    
    router.get('/iletisim_ekle', function(req, res){
        req.session.currentPage = '/html/iletisim_ekle';
        req.session.pageLabel = 'iletisim';
        res.render('iletisim_ekle', {layout : false, session : req.session});
    });
    router.get('/iletisim_listele', function(req, res){
        req.session.currentPage = '/html/iletisim_listele';
        req.session.pageLabel = 'iletisim';
        res.render('iletisim_listele', {layout : false, session : req.session});
    });
    
    return router;
}
module.exports = HTMLRouter;
