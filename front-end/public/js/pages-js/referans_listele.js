function clickHandlers(){
    $(".referanslar").on("click",".resimSil",function(){
        var id=$(this).closest("tr").attr("id");
        var id2=$(this).closest("td").attr("id");
        var data = {fotograflar : {_id : id2}};
        var tr=$(".referanslar").find("tbody").find("tr[temp="+id2+"]");
        alertify.confirm("Silmek istediğinizden emin misiniz?",
            function(){
                wsPost("/referanslar/arraysil",{_id:id, arrayItem : data},function(err,data){
                    if(err){
                        console.error(err);
                        return;
                    }
                    alertify.success('Başarı ile silindi.');
                    tr.remove();
                    orderTable(".referanslar");
                    callback(id);
                });
            },
            function() {
               alertify.error('İşlem iptal edildi.');
        });       
    });
}

function formHandlers(){

}

function otherScripts(){
    
}