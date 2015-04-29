function clickHandlers(){
    $('#btnSubmitModal').on('click', function(){
        $.blockUI({ css: { backgroundColor: '#2980b9', color: '#fff' , padding:'30px', fontSize : '28px'} ,message : "Resim Yükleniyor..."});
        $('#uploadModal').modal('hide');
    });
}

function formHandlers(){
    $('#formPdfYukle').ajaxForm(function(data){
        if(!data.state){
            $.unblockUI();
            alertify.error('fotograf yuklenemedi.');
            return;
        }
        $('#inpResimYukle').val(data.dosyaLinki);
        $.unblcokUI();
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
        $("textarea").val("");
        $("input[type='date']").val("gg.aa.yyyy");
    });
}

function otherScripts(){
    
}