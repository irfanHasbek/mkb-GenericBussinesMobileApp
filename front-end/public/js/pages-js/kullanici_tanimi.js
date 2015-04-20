function clickHandlers(){
    $('.kullaniciTablosu').on('click', '.duzenle', function(){
        var id = $(this).closest('tr').attr('id');
        $('#formKullanici').attr('action', '/kullanici/guncelle');
        $('#inpId').removeAttr('disabled');
        $('#inpId').val(id);
        wsPost('/kullanici/getir', {_id : id}, function(hata, data){
            if(hata || !data.state){
                alertify.error('Hata olustu!');
                return;
            }
            console.log(data);
            $('#inpIsim').val(data.data.isim);
            $('#inpSoyisim').val(data.data.soyisim);
            $('#inpRol').val(data.data.rol);
            $('#inpGorev').val(data.data.gorev);
            $('#inpGsm').val(data.data.gsm1);
            $('#inpEmail').val(data.data.email);
            $('#inpSifre').val(data.data.sifre);
            if(data.data.aktif){
                $('#inpAktif').selected(true);
            }
        });
    });
    
    $('#btnKullaniciKaydet').on('click', function(e){
        if($('#inpSifre').val() != $('#inpSifreTekrar').val()){
            e.preventDefault();
            alertify.error('Sifreler uyusmuyor!');
            return;
        }
    });
    removeFromTable('kullaniciTablosu', '/kullanici/sil',function(id){});
}

function formHandlers(){
    $('#formKullanici').ajaxForm(function(data){
        if(!data.state){
            alertify.error('Hata olustu!');
        }
        if($('#formKullanici').attr('action') == '/kullanici/guncelle'){
            $('#formKullanici').attr('action', '/kullanici/ekle');
            $('#inpId').attr('disabled'); 
        }
        alertify.success('Islem basarili.');
        location.reload();
    });
}

function otherScripts(){
    $('#inpAktif').change(function(){
        if(this.checked == true){
            $('#inpGizliAktif').val(true);   
        }else{
            $('#inpGizliAktif').val(false);
        }
    });
}