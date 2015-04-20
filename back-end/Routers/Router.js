var express = require('express');

function CRUD(model){
    var router = express.Router();
    router.get('/listele', function(req, res) {
        model.find({}, function(dbHatasi, listelenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else{
                res.send({state : true, data : listelenen});
            }
        });
    });

    router.post('/ekle', function(req, res){        
        new model(req.body).save(function(dbHatasi, eklenen) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : eklenen});
            }
        });
    });
    
    router.get('/hepsinisil', function(req, res) {
        model.remove({}, function(dbHatasi) {
            if(dbHatasi) {
                res.send({state : false, data : dbHatasi});
                return;
            }
            else {
                res.send({state : true, data : "Tumu silindi."});
            }
        });
    });
    
    return router;
}
module.exports = CRUD;
