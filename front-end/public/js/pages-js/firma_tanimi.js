function clickHandlers(){
    $('#btnSubmitModal').on('click', function(e){
        if($('#inpFotografYukle').val() == ''){
            e.preventDefault();
            alertify.error("Lutfen fotograf seciniz");
        }
        $('#uploadModal').modal('hide');
        $.blockUI({ css: { backgroundColor: '#2980b9', color: '#fff' , padding:'30px', fontSize : '28px'} ,message : "Resim Yükleniyor..."});
    });
    
    $('#btnFirmaKaydet').on('click', function(e){
        if($('#inpFotografListesi').val() == ''){
            e.preventDefault();
            alertify.error("Lutfen fotograf yukleyiniz");
        }
        
        if($('#slctFirma').val() == '-1'){
            $('#inpFirmaKodu').val(toHash($('#inpUnvan').val()));
            $('#formFirmaTanimi').attr('action', '/firma_tanimi/ekle');
            $('#slctFirma').attr('disabled', 'disabled');
        }else{
            $('#formFirmaTanimi').attr('action', '/firma_tanimi/guncelle');
        }
    });
    
    $('#btnFirmaBilgiGetir').on('click', function(){
         if($('#slctFirma').val() != '-1'){
            var firmaId = $('#slctFirma').val();
            //console.log(firmaId);
            wsPost('/firma_tanimi/getir', { _id : $('#slctFirma').val()}, function(hata, data){
                if(hata || !data.state){
                    alertify.error('Firma bulunamadi');
                    return;
                }
                //console.log(data);
                $('#inpGizliFirmaKodu').val(data.data.firmaKodu);
                $('#inpUnvan').val(data.data.unvan);
                $('#inpFotografListesi').val(data.data.resimLinki);
                $('#inpEmail').val(data.data.email);
                $('#inpFirmaKodu').val(data.data.firmaKodu);
                $('#inpSifre').val(data.data.sifre);
                
                $('#inpYetkiliIsim').val(data.data.yetkiliIsim);
                $('#inpYetkliliGorev').val(data.data.yetkiliGorev);
                $('#inpYetkiliGsm').val(data.data.yetkiliGsm);
                $('#inpYetkiliEmail').val(data.data.yetkiliEmail);
                
                $('#inpIletisimAdres').val(data.data.iletisimAdres);
                $('#inpIletisimIl').val(data.data.iletisimIl);
                $('#inpIletisimIlce').val(data.data.iletisimIlce);
                $('#inpIletisimIsTel').val(data.data.iletisimIsTel);
                $('#inpIletisimFax').val(data.data.iletisimFax);
                $('#inpIletisimWebAdres').val(data.data.iletisimWebAdres);
            });
         }else{
             alertify.error("Lutfen once forma seciniz.");
         }
    });
}

function formHandlers(){
    $('#formFotografYukle').ajaxForm(function(data){
         if(!data.state){
             $.unblockUI();
             alertify.error("Fotograf Yuklenemedi");
             return;
         }
         $('#inpFotografListesi').val(data.fotografListesi.fotograflar.path.replace('front-end/public/', data.host));
         //console.log($('#inpFotografListesi').val());
         $.unblockUI();
    });
    
    $('#formFirmaTanimi').ajaxForm(function(data){
         if(!data.state){
             alertify.error("Islem gerceklestirilemedi.");
             return;
         }
         $('#slctFirma').removeAttr('disabled');
         //console.log(data.data.firmaKodu)
         if($('#formFirmaTanimi').attr('action') == '/firma_tanimi/ekle'){
            wsPost('/versiyon/ekle', {mobilVersion : '1', firmaKodu : data.data.firmaKodu}, function(hata, dataVersiyon){
                 if(hata || !dataVersiyon.state){
                     alertify.error("Versiyon sorunu olustu.");
                     return;
                 }
                 alertify.success('Islem basariyla gerceklesti.');
                 //console.log(data);
                 //console.log(dataVersiyon);
             });   
         }
    });
}

function otherScripts(){
    
}