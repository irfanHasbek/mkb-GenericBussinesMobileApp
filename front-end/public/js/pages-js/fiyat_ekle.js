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
        console.log($('#inpArrayItem').val());
        alertify.success('Yukleme basarili.');
    });
    
    $('#formFiyatEkle').ajaxForm(function(data){
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