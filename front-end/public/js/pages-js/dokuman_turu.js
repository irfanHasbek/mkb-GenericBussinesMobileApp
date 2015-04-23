function clickHandlers(){
    removeFromTable("dokumanTuru","/dokuman_tanimi/sil",function(id){});
}

function formHandlers(){
    $('#formDokumanTuru').ajaxForm(function(data){
         if(!data.state){
            alertify.error('Dokuman turu eklenemedi.');
            return;
        }
        alertify.success('Dokuman turu basariyla eklendi.');
        var count= $(".dokumanTuru tbody tr").size();
        var tr=$("<tr id="+data.data._id+"></>");
        var td1=$("<td class='text-center'>"+count+".</td>");
        var td2=$("<td>"+data.data.dokumanTuru+"</td>");
        var td3=$("<td>"+data.data.degistiren+"</td>");
        var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
        var td4=$("<td>"+btnSil+"</td>");
        tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);
        $(".dokumanTuru tbody").last().append(tr);
        $("input[type='text']").val("");
    });
}

function otherScripts(){
    
}