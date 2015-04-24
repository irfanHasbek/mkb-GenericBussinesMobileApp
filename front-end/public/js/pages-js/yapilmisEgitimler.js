function clickHandlers(){
    $('#btnSubmitModal').on('click', function(){
        $('#uploadModal').modal('hide');
    });
}

function formHandlers(){
    $('#formPdfYukle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('fotograf yuklenemedi.');
            return;
        }
        $('#inpResimYukle').val(data.dosyaLinki);
        alertify.success('Yukleme basarili.')
    });
    
    $('#frmYapilmisEgitimler').ajaxForm(function(data){
        if(!data.state){
            alertify.error('fotograf yuklenemedi.');
            return;
        }
        alertify.success('Basariyla kaydedildi.');
        $('input[type=text]').val('');
        $('input[type=file]').val('');
    });
}

function otherScripts(){
    
}