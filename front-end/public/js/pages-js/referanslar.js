function clickHandlers(){
    $('#btnSubmitModal').on('click', function(){
        $('#uploadModal').modal('hide');
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
        for(var i = 0; i < resimListesi.length; i++){
            var icerik = {link : resimListesi[i].path.replace("front-end/public/", data.host)};
            array.push(icerik);
        }
        $('#inpFotografListesi').val(JSON.stringify(array));
        alertify.success('Yukleme basarili.')
    });
    
    $('#formReferansEkle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('Referans eklenemedi.');
            console.log(JSON.stringify(data));
            return;
        }
        $('#formResimListesi').submit();
        alertify.success('Basariyla kaydedildi.');
        $('input[type=text]').val('');
        $('input[type=file]').val('');
    });
}

function otherScripts(){
    
}