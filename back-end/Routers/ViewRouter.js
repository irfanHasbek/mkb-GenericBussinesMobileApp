var express = require('express');
var KullaniciModeli = require('../Modeller/KullaniciModeli');
var RolTanimiModeli = require('../Modeller/RolTanimiModeli');
var GorevTanimiModeli = require('../Modeller/GorevTanimiModeli');
var DokumanModeli = require('../Modeller/DokumanModeli');
var UrunModeli = require('../Modeller/UrunModeli');
var FiyatModeli= require("../Modeller/FiyatModeli");
var ReferansModeli= require("../Modeller/ReferansModeli");
var IletisimModeli=require("../Modeller/IletisimModeli");
var YapilmisEgitimlerModeli=require("../Modeller/YapilmisEgitimlerModeli");
var HaberlerModeli=require("../Modeller/HaberlerModeli");
var EgitimTakvimiModeli=require("../Modeller/EgitimTakvimiModeli");

function HTMLRouter(){
    var router = express.Router();
    router.get('/anasayfa_firma', function(req, res){
        req.session.currentPage = '/html/anasayfa_firma';
        req.session.pageLabel = 'anasayfa';
        req.session.LeftMenuCategory = 'anasayfa';
        res.render('anasayfa_firma', {layout : false, session : req.session});
    });
    
    router.get('/rol_tanimi', function(req, res){
        req.session.currentPage = '/html/rol_tanimi';
        req.session.pageLabel = 'kullanicilar';
        req.session.LeftMenuCategory = 'kullanicilar';
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
        req.session.LeftMenuCategory = 'kullanicilar';
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
        req.session.LeftMenuCategory = 'kullanicilar';
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
    
    router.get('/dokuman_turu_ekle', function(req, res){
        req.session.currentPage = '/html/dokuman_turu_ekle';
        req.session.pageLabel = 'dokumanlar';
        req.session.LeftMenuCategory = 'mobil';
        DokumanModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('dokuman_turu_ekle', {layout : false, session : req.session, dokumanTurleri : listelenen});
        });
    });
    router.get('/dokuman_ekle', function(req, res){
        req.session.currentPage = '/html/dokuman_ekle';
        req.session.pageLabel = 'dokumanlar';
        req.session.LeftMenuCategory = 'mobil';
        DokumanModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('dokuman_ekle', {layout : false, session : req.session, dokumanTurleri : listelenen});
        });
    });
    
    router.get('/dokuman_listele', function(req, res){
        req.session.currentPage = '/html/dokuman_listele';
        req.session.pageLabel = 'dokumanlar';
        req.session.LeftMenuCategory = 'mobil';
        DokumanModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('dokuman_listele', {layout : false, session : req.session, dokumanlar : listelenen});
        });
    });
    //Ürünler 
    router.get('/urun_grubu_ekle', function(req, res){
        req.session.currentPage = '/html/urun_grubu_ekle';
        req.session.pageLabel = 'urunler';
        req.session.LeftMenuCategory = 'mobil';
        UrunModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('urun_grubu_ekle', {layout : false, session : req.session, urunGrublari : listelenen});
        });
    });
    router.get('/urun_ekle', function(req, res){
        req.session.currentPage = '/html/urun_ekle';
        req.session.pageLabel = 'urunler';
        req.session.LeftMenuCategory = 'mobil';
        UrunModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('urun_ekle', {layout : false, session : req.session, urunGruplari : listelenen});
        });
    });
    router.get('/urun_listele', function(req, res){
        req.session.currentPage = '/html/urun_listele';
        req.session.pageLabel = 'urunler';
        req.session.LeftMenuCategory = 'mobil';
        UrunModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('urun_listele', {layout : false, session : req.session, urunGruplari : listelenen});
        });
    });
    //Eğitim Takvimi
    router.get('/egitim_takvimi_ekle', function(req, res){
        req.session.currentPage = '/html/egitim_takvimi_ekle';
        req.session.pageLabel = 'egitim_takvimi';
        req.session.LeftMenuCategory = 'mobil';
        res.render('egitim_takvimi_ekle', {layout : false, session : req.session});
    });
    router.get('/egitim_takvimi_listele', function(req, res){
        req.session.currentPage = '/html/egitim_takvimi_listele';
        req.session.pageLabel = 'egitim_takvimi';
        req.session.LeftMenuCategory = 'mobil';
        EgitimTakvimiModeli.find({firmaKodu : req.session.kullanici.firmaKodu},function(dbHatasi,listelenen){
            if(dbHatasi||!listelenen){
                res.send({state:false,data:dbHatasi});
                return;
            }
           res.render('egitim_takvimi_listele', {layout : false, session : req.session,egitimTakvimi:listelenen}); 
        });
    });
    
    //Fiyat 
    router.get('/fiyat_grubu_ekle', function(req, res){
        req.session.currentPage = '/html/fiyat_grubu_ekle';
        req.session.pageLabel = 'fiyat';
        req.session.LeftMenuCategory = 'mobil';
        FiyatModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('fiyat_grubu_ekle', {layout : false, session : req.session, fiyatGrublari : listelenen});
        });
    });
        router.get('/fiyat_ekle', function(req, res){
        req.session.currentPage = '/html/fiyat_ekle';
        req.session.pageLabel = 'fiyat';
        req.session.LeftMenuCategory = 'mobil';
        FiyatModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('fiyat_ekle', {layout : false, session : req.session, fiyatGruplari : listelenen});
        });
    });
        router.get('/fiyat_listele', function(req, res){
        req.session.currentPage = '/html/fiyat_listele';
        req.session.pageLabel = 'fiyat';
        req.session.LeftMenuCategory = 'mobil';
        FiyatModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('fiyat_listele', {layout : false, session : req.session, fiyatGruplari : listelenen});
        });
    });
    //Referans 
    
    router.get('/referans_ekle', function(req, res){
        req.session.currentPage = '/html/referans_ekle';
        req.session.pageLabel = 'referans';
        req.session.LeftMenuCategory = 'mobil';
        ReferansModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('referans_ekle', {layout : false, session : req.session, referanslar : listelenen});
        });
    });
    router.get('/referans_listele', function(req, res){
        req.session.currentPage = '/html/referans_listele';
        req.session.pageLabel = 'referans';
        req.session.LeftMenuCategory = 'mobil';
        ReferansModeli.find({firmaKodu : req.session.kullanici.firmaKodu}, function(dbHatasi, listelenen){
            if(dbHatasi || !listelenen){
                res.send({state : false, data : dbHatasi});
                return;  
            }
            res.render('referans_listele', {layout : false, session : req.session, referanslar : listelenen});
        });
    });
    //Yapılmış Eğitim 
    
    router.get('/yapilmis_egitim_ekle', function(req, res){
        req.session.currentPage = '/html/yapilmis_egitim_ekle';
        req.session.pageLabel = 'yapilmis_egitim';
        req.session.LeftMenuCategory = 'mobil';
        res.render('yapilmis_egitim_ekle', {layout : false, session : req.session});
    });
    router.get('/yapilmis_egitim_listele', function(req, res){
        req.session.currentPage = '/html/yapilmis_egitim_listele';
        req.session.pageLabel = 'yapilmis_egitim';
        req.session.LeftMenuCategory = 'mobil';
        YapilmisEgitimlerModeli.find({firmaKodu : req.session.kullanici.firmaKodu},function(dbHatasi,listelenen){
            if(dbHatasi || !listelenen){
                res.send({state:false,data:dbHatasi});
                return;
            }
        res.render('yapilmis_egitim_listele', {layout : false, session : req.session,yapilmisEgitimler:listelenen});
        });
    });
    //Haberler 
    
    router.get('/haber_ekle', function(req, res){
        req.session.currentPage = '/html/haber_ekle';
        req.session.pageLabel = 'haberler';
        req.session.LeftMenuCategory = 'mobil';
        res.render('haber_ekle', {layout : false, session : req.session});
    });
    router.get('/haber_listele', function(req, res){
        req.session.currentPage = '/html/haber_listele';
        req.session.pageLabel = 'haberler';
        req.session.LeftMenuCategory = 'mobil';
        HaberlerModeli.find({firmaKodu : req.session.kullanici.firmaKodu},function(dbHatasi,listelenen){
            if(dbHatasi || !listelenen){
                res.send({state:false,data:dbHatasi});
                return;
            }
            res.render('haber_listele', {layout : false, session : req.session,haberler:listelenen});
        });
    });
    //İletişim 
    
    router.get('/iletisim_ekle', function(req, res){
        req.session.currentPage = '/html/iletisim_ekle';
        req.session.pageLabel = 'iletisim';
        req.session.LeftMenuCategory = 'mobil';
        res.render('iletisim_ekle', {layout : false, session : req.session});
    });
    router.get('/iletisim_listele', function(req, res){
        req.session.currentPage = '/html/iletisim_listele';
        req.session.pageLabel = 'iletisim';
        req.session.LeftMenuCategory = 'mobil';
        IletisimModeli.find({firmaKodu : req.session.kullanici.firmaKodu},function(dbHatasi,listelenen){
            if(dbHatasi || !listelenen){
                res.send({state:false,data:dbHatasi});
                return;
            }
            res.render('iletisim_listele', {layout : false, session : req.session,iletisimListesi:listelenen});
        });
    });
    
    return router;
}
module.exports = HTMLRouter;
