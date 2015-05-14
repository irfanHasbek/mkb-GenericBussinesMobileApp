var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var config = require('./config/development');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var CRUDRouter = require('./back-end/Routers/Router');

function createCrudRouter(app, modelPath, url){
    var Model = require(modelPath);
    var Router = CRUDRouter(Model);
    app.use(url, Router);   
}
function assignRouter(app, routerPath, url){
    var router = require(routerPath);
    app.use(url, router());
}
mongoose.connect(config.dbpath, function(err){
    if(err) {
        console.log("mongo connection failed")
        return
    }
    var app = express();
    //session
    app.use(session({secret: 'mkbgba', resave: true, saveUninitialized: true}));
    
    // use ejs-locals for all ejs templates: 
    app.engine('ejs', ejs.renderFile);

    // so you can render('index') 
    app.set('views',__dirname + '/front-end/public/pages');
    app.set('view engine', 'ejs'); 

    // now we can use files(images, css, js) under public folder in rendered
    // files
    app.use(express.static(__dirname + '/front-end/public'));
    
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());
    
    function sessionIzinler(req){
        var urlList = req.originalUrl.split('/');
        console.log('url :' + req.originalUrl);
        if(req.session.giris || req.originalUrl == '/hesap/giris' || req.originalUrl.indexOf('onyukleme') > 0 || req.originalUrl.indexOf('listele') > 0 || req.originalUrl.indexOf('ara') > 0 || req.originalUrl.indexOf('mail') > 0){
            return true;   
        }
        else
            return false
    }
    
    app.all('/*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
        next();
    });
    
    app.use(function(req, res, next){
        if(sessionIzinler(req)){
            console.log('sessionCheck is true');
            next();
        }else{
            console.log('sessionCheck is false');
            res.render('giris');
        }
    });

    //Onyukleme 
    assignRouter(app, './back-end/Routers/OnyuklemeRouter', '/onyukleme');
    //giris ve cikis
    assignRouter(app, './back-end/Routers/HesapRouter', '/hesap');
    //Html view router
    assignRouter(app, './back-end/Routers/ViewRouter', '/html');
    //Versiyon router
    assignRouter(app, './back-end/Routers/VersiyonRouter', '/versiyon');
    //yukleme router
    assignRouter(app, './back-end/Routers/YuklemeRouter', '/yukleme');
    //diger router
    assignRouter(app, './back-end/Routers/DigerRouter', '/diger');
    
    //Kullanici crud operasyon
    createCrudRouter(app, './back-end/Modeller/FirmaModeli', '/firma_tanimi');
    createCrudRouter(app, './back-end/Modeller/KullaniciModeli', '/kullanici');
    createCrudRouter(app, './back-end/Modeller/RolTanimiModeli', '/rol_tanimi');
    createCrudRouter(app, './back-end/Modeller/GorevTanimiModeli', '/gorev_tanimi');
    createCrudRouter(app, './back-end/Modeller/DokumanModeli', '/dokuman_tanimi');
    createCrudRouter(app, './back-end/Modeller/UrunModeli', '/urun_tanimi');
    createCrudRouter(app, './back-end/Modeller/FiyatModeli', '/fiyat_tanimi');
    createCrudRouter(app, './back-end/Modeller/ReferansModeli', '/referanslar');
    createCrudRouter(app, './back-end/Modeller/IletisimModeli', '/iletisim');
    createCrudRouter(app, './back-end/Modeller/YapilmisEgitimlerModeli', '/yapilmis_egitimler');
    createCrudRouter(app, './back-end/Modeller/HaberlerModeli', '/haberler');
    createCrudRouter(app, './back-end/Modeller/EgitimTakvimiModeli', '/egitim_takvimi');
    createCrudRouter(app, './back-end/Modeller/VideoModeli', '/video_tanimi');
    
    app.get('/', function(req, res){
        res.render('giris'); 
    });
    
    if (!module.parent) {
        app.listen(config.port);
        console.log('Generic Bussiness Modile App --> started on port : ' + config.port);
    }
});
