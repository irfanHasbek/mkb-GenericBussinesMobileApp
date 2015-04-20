var express = require('express');

function CRUD(model){
    var router = express.Router();
    router.get('/listele', function(req, res) {
        model.find({}, function(dbHatasi, listelenen) {
            if(dbHatasi) {
                res.send(dbHatasi);
                return;
            }
            else{
                res.send(listelenen);
            }
        });
    });

    router.post('/ekle', function(req, res){        
        new model(req.body).save(function(dbHatasi, eklenen) {
            if(dbHatasi) {
                res.send(dbHatasi);
                return;
            }
            else {
                res.send(eklenen);
            }
        });
    });
    
    router.get('/hepsinisil', function(req, res) {
        model.remove({}, function(dbHatasi) {
            if(dbHatasi) {
                res.send(dbHatasi);
                return;
            }
            else {
                res.send({mesaj : "Tumu silindi."});
            }
        });
    });
    
    return router;
}
module.exports = CRUD;
