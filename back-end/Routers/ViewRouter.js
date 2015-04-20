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
    
    return router;
}
module.exports = HTMLRouter;
