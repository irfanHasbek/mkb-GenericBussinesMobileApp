function clickHandlers(){
    $('#btnSubmitModal').on('click', function(){
        $('#uploadModal').modal('hide');
    });
}

function formHandlers(){
    $('#formPdfYukle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('pdf yuklenemedi.');
            return;
        }
        var arrayItem = {
            icerik : [{dosyaAdi : $('#inpDosyaAdi').val(), dosyaLinki : data.dosyaLinki}]  
        }
        $('#inpArrayItem').val(JSON.stringify(arrayItem));
        alertify.success('Yukleme basarili.')
    });
    
    $('#formDokumanEkle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('pdf yuklenemedi.');
            return;
        }
        alertify.success('Basariyla kaydedildi.');
        $('input[type=text]').val('');
        $('input[type=file]').val('');
    });
}

function otherScripts(){
    
}