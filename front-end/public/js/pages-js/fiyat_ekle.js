function clickHandlers(){
    $('#btnSubmitModal').on('click', function(){
        $('#uploadModal').modal('hide');
        $.blockUI({ css: { backgroundColor: '#2980b9', color: '#fff' , padding:'30px', fontSize : '28px'} ,message : "PDF Yükleniyor..."});
    });
}

function formHandlers(){
    $('#formPdfYukle').ajaxForm(function(data){
        if(!data.state){
            $.unblockUI();
            alertify.error('pdf yuklenemedi.');
            return;
        }
        var arrayItem = {
            icerik : [{dosyaAdi : $('#inpDosyaAdi').val(), dosyaLinki : data.dosyaLinki}]  
        }
        $('#inpArrayItem').val(JSON.stringify(arrayItem));
        console.log($('#inpArrayItem').val());
        $.unblockUI();
        alertify.success('Yukleme basarili.');
    });
    
    $('#formFiyatEkle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('fiyat eklenemedi.');
            return;
        }
        alertify.success('Basariyla kaydedildi.');
        $('input[type=text]').val('');
        $('input[type=file]').val('');
    });
}

function otherScripts(){
    
}