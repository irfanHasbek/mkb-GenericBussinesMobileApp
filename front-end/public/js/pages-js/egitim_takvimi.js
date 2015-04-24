function clickHandlers(){
}

function formHandlers(){
    $('#frmEgitimTakvimi').ajaxForm(function(data){
         if(!data.state){
            alertify.error('Eğitim Takvimi turu eklenemedi.');
            return;
        }
        alertify.success('Eğitim Takvimi basariyla eklendi.');
        $("input[type='text']").val("");
        $("input[type='date']").val("gg.aa.yyyy");
    });
}

function otherScripts(){
    
}