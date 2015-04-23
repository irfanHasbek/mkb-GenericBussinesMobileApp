function clickHandlers(){
    //{$pull :{ towns : {townName : resp.townName}} 
    //removeFromTableNew('dokumanlar','/dokuman_tanimi/arraysil',2,function(id){});
    $('.resimSil').on('click', function(){
        var pictureId = $(this).attr('id');
        console.log(pictureId);
        
        //$('a[temp=' + pictureId + ']').remove();
    });
}

function formHandlers(){

}

function otherScripts(){
    
}