var mongoose = require('mongoose');
var express = require('express');
var session = require('express-session');
var config = require('./config/development');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var CRUDRouter = require('./back-end/Routers/Router');
var multer = require('multer');
var crypto = require('crypto');

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
    
    app.use(function(req, res, next){
        //to do 
        var urlList = req.originalUrl.split('/');
        if(req.session.giris || req.originalUrl == '/hesap/giris' || req.originalUrl == '/onyukleme/yoneticiekle' || req.originalUrl.indexOf('/listele') > 0){
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
    //Kullanici crud operasyon
    createCrudRouter(app, './back-end/Modeller/KullaniciModeli', '/kullanici');
    createCrudRouter(app, './back-end/Modeller/RolTanimiModeli', '/rol_tanimi');
    createCrudRouter(app, './back-end/Modeller/GorevTanimiModeli', '/gorev_tanimi');
    createCrudRouter(app, './back-end/Modeller/DokumanModeli', '/dokuman_tanimi');
    createCrudRouter(app, './back-end/Modeller/UrunModeli', '/urun_tanimi');
    createCrudRouter(app, './back-end/Modeller/FiyatModeli', '/fiyat_tanimi');

    app.get('/', function(req, res){
        res.render('giris'); 
    });
    
    //pdf yukleme
    app.post('/pdfyukle', multer({
        dest: './front-end/public/yuklemeler/pdfler',
        rename: function (fieldname, filename) {
            var hash = crypto.createHash('sha1');
            hash.setEncoding('hex');
            hash.write(filename);
            hash.end();
            return hash.read();
        },
        onFileUploadComplete: function (file) {
            //console.log(file.fieldname + ' uploaded to  ' + file.path);
        },
        onError: function(error, next) {
            console.log("Error occurred while uploading the file!!");
        }
    }),function(req, res){
        //req.protocol
        res.send({state : true, dosyaAdi : req['files'].pdfler.originalname, dosyaLinki : 'http://192.168.1.22' + ':3000' + '/yuklemeler/pdfler/' + req['files'].pdfler.name});
    });
    
    if (!module.parent) {
        app.listen(config.port);
        console.log('Generic Bussiness Modile App --> started on port : ' + config.port);
    }
});
