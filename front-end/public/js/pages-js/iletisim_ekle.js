function clickHandlers(){
    
}

function formHandlers(){
    $("#frmIletisim").ajaxForm(function(data){
        $("input").val("");
        $("textarea").val("");
        alertify.success("Bayi başarıyla eklendi");
    });
}

function otherScripts(){
    
}