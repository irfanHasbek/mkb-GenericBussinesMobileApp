function clickHandlers(){
    removeFromTable("videolar", "/video_tanimi/sil", function(id){});
    $("#btnIdBul").on('click', function(e){
        e.preventDefault();
        
        if($('#inpUrl').val().indexOf('/') > 0){
            var linkArray = $('#inpUrl').val().split('/');
            var supporter = $('#slctSupporter').val();
            var channelId = "";
            if(linkArray.length > 0 && supporter == "youtube"){
                channelId = linkArray[linkArray.length - 1];
                $('#inpChannelId').val(channelId);
            }   
        }else
            alertify.error("Lutfen gecerli bir url girin");
        
    }); 
    
    $("#btnYoutubeIdKaydet").on('click', function(e){
        if($('#inpChannelId').val() == "Belirlenmedi"){
            e.preventDefault();
            alertify.error("Lutfen kanal url i girip id olusturun.");
        }
    });
}

function formHandlers(){
    $('#formVideoEkle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('Hata olustu');
            return;
        }
        alertify.success("Video id basariyla eklendi.");
        var count= $(".videolar tbody tr").size();
        var tr=$("<tr id="+data.data._id+"></>");
        var td1=$("<td class='text-center'>"+count+".</td>");
        var td2=$("<td>"+data.data.videoSaglayici+"</td>");
        var td3=$("<td>"+data.data.videoLinki+"</td>");
        var td5 = '';
        if(data.data.aktif == "false"){
            td5=$('<td class="text-center"><i style="color:#911E29;" class="fa fa-times"></i></td>');
        }else{
            td5 = $('<td class="text-center"><i style="color:#0DA611;" class="fa fa-check"></i></td>'); 
        }
        var td4=$("<td>"+data.data.degistiren+"</td>");
        var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
        var td6=$("<td>"+btnSil+"</td>");
        tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);tr.append(td5);tr.append(td6);
        $(".videolar tbody").last().append(tr);
        $("input[type='text']").val("");
        $("#inpChannelId").val("Belirlenmedi");
    });
}

function otherScripts(){
    $('#inpAktif').change(function(){
        if(this.checked == true){
            $("#inpGizliAktif").val("true");
        }else{
            $("#inpGizliAktif").val("false");
        }
    });
}