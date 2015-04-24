function clickHandlers(){
    $('#btnSubmitModal').on('click', function(){
        $('#uploadModal').modal('hide');
    });
    $("#btnReferansSubmit").on('click', function(e){
        if($('#inpFotografListesi').val() == "null"){
            e.preventDefault();
            alertify.error('Fotograf yuklemeden ekleme yapamazsiniz!');
        }
    });
}

function formHandlers(){
    $('#formResimYukle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('pdf yuklenemedi.');
            return;
        }
        var array = [];
        var resimListesi = data.fotografListesi.resimler;
        alertify.success('Yukleme basarili.')
    });
    
    $('#formHaberEkle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('Haber eklenemedi.');
            console.log(JSON.stringify(data));
            return;
        }
        alertify.success('Basariyla kaydedildi.');
    });
}

function otherScripts(){
    
}