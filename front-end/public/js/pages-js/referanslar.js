function clickHandlers(){
    $('#btnSubmitModal').on('click', function(){
        $('#uploadModal').modal('hide');
        $.blockUI({ css: { backgroundColor: '#2980b9', color: '#fff' , padding:'30px', fontSize : '28px'} ,message : "Resimler Yükleniyor..."});
    });
    $("#btnReferansSubmit").on('click', function(e){
        if($('#inpFotografListesi').val() == "null"){
            e.preventDefault();
            alertify.error('Fotograf yuklemeden ekleme yapamazsiniz!');
        }
    });
    removeFromTable('referanslar',"/referanslar/sil",function(id){});
}

function formHandlers(){
    $('#formResimYukle').ajaxForm(function(data){
        if(!data.state){
            $.unblockUI();
            alertify.error('pdf yuklenemedi.');
            return;
        }
        var array = [];
        //console.log(data);
        var resimListesi = data.fotografListesi.resimler;
        if($.isArray(resimListesi)){
            for(var i = 0; i < resimListesi.length; i++){
                var icerik = {link : resimListesi[i].path.replace("front-end/public/", data.host)};
                array.push(icerik);
            }   
        }else{
            var icerik = {link : resimListesi.path.replace("front-end/public/", data.host)};
            array.push(icerik);
        }
        $('#inpFotografListesi').val(JSON.stringify(array));
        $.unblockUI();
        alertify.success('Yukleme basarili.')
    });
    
    $('#formReferansEkle').ajaxForm(function(data){
        if(!data.state){
            alertify.error('Referans eklenemedi.');
            console.log(JSON.stringify(data));
            return;
        }
        alertify.success('Basariyla kaydedildi.');
        var count= $(".referanslar tbody tr").size();
        var tr=$("<tr id="+data.data._id+"></>");
        var td1=$("<td class='text-center'>"+count+".</td>");
        var td2=$("<td>"+data.data.projeYeri+"</td>");
        var td3=$("<td>"+data.data.bayi+"</td>");
        var td4=$("<td>"+data.data.kullanilanUrun+"</td>");
        var td5=$("<td>"+data.data.aciklama+"</td>");
        var td6=$("<td>"+data.data.degistiren+"</td>");
        var btnSil='<button class="btn btn-danger btn-sm sil"><i class="fa fa-trash-o"></i></button>';
        var td7=$("<td>"+btnSil+"</td>");
        tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);tr.append(td5);tr.append(td6);tr.append(td7);
        $(".referanslar tbody").last().append(tr);
        $('input[type=text]').val('');
        $('input[type=file]').val('');
    });
}

function otherScripts(){
    
}