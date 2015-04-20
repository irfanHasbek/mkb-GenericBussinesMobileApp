function clickHandlers(){
    removeFromTable("roller","/rol_tanimi/sil",function(id){});
}

function formHandlers(){
    $('#formRolTanimi').ajaxForm(function(data){
        if(!data.state){
            alertify.error('Rol eklenemedi.');
            return;
        }
        alertify.success('Rol basariyla eklendi.');
        var count= $(".roller tbody tr").size();
        var tr=$("<tr id="+data.data._id+"></>");
        var td1=$("<td class='text-center'>"+count+".</td>");
        var td2=$("<td>"+data.data.rol+"</td>");
        var td3=$("<td>"+data.data.degistiren+"</td>");
        var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
        var td4=$("<td>"+btnSil+"</td>");
        tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);
        $(".roller tbody").last().append(tr);
        $("input[type='text']").val("");
    });
}

function otherScripts(){
    
}