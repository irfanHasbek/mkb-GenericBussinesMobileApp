var express = require('express');

function HTMLRouter(){
    var router = express.Router();
    router.get('/anasayfa_firma', function(req, res){
        req.session.currentPage = '/html/anasayfa_firma'
        res.render('anasayfa_firma', {layout : false, session : req.session});
    });
    
    return router;
}
module.exports = HTMLRouter;
