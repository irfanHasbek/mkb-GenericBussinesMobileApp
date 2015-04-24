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
        var resimListesi = data.fotografListesi.resimler;
        //console.log(resimListesi);
        $('#inpFotografListesi').val(resimListesi.path.replace('front-end/public/',data.host));
        alertify.success('Yukleme basarili.');
    });
    
    $('#formHaberEkle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('Haber eklenemedi.');
            //console.log(JSON.stringify(data));
            return;
        }
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