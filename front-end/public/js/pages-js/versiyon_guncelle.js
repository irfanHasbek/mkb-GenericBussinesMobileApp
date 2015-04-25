function clickHandlers(){
    $("#btnVersiyonGuncelle").on('click', function(e){
        e.preventDefault();
        alertify.confirm("Bu islem sonucunda bu verileri kullanan tüm mobil uygulamalar güncel verileri güncelleme olarak inderecek ve kullanacaktir.Devam etmek istiyor musunuz?" ,function(){
            $("#formVersiyonGuncelle").submit();
        } ,function(){
            alertify.error("Islem iptal edildi.");
        });
    }); 
}

function formHandlers(){
    $("#formVersiyonGuncelle").ajaxForm(function(data){
        if(!data.state){
            alertify.error("Islem tamamlanamadi.");
            return;
        }
        alertify.success("Versiyon Guncellendi");
        setTimeout(function(){
            window.location.reload();
        }, 2000);
    });
}

function otherScripts(){
    
}
