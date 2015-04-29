function clickHandlers(){
    $('#btnSubmitModal').on('click', function(){
        $('#uploadModal').modal('hide');
        $.blockUI({ css: { backgroundColor: '#2980b9', color: '#fff' , padding:'30px', fontSize : '28px'} ,message : "Resim Yükleniyor..."});
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
            $.unblockUI();
            alertify.error('Resim yuklenemedi.');
            return;
        }
        var resimListesi = data.fotografListesi.resimler;
        //console.log(resimListesi);
        $('#inpFotografListesi').val(resimListesi.path.replace('front-end/public/',data.host));
        $.unblockUI();
        alertify.success('Yukleme basarili.');
    });
    
    $('#formHaberEkle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('Haber eklenemedi.');
            //console.log(JSON.stringify(data));
            return;
        }
        console.log(data);
        alertify.success('Basariyla kaydedildi.');
    });
}

function otherScripts(){
    $("#inpTarih").change(function(){
        var temp = $(this).val();
        $(this).val(organizeDate(temp));
        //console.log($(this).val());
    });
}