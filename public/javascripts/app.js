// /**
//  * Created by jenniferbrown on 11/2/16.
//  */

$.ajax({
    type: "POST",
    url:'localhost:3000/submit/upload-content',
    contentType: "image/png",
    data: "id_projet=[% visual.projet.id %]",
    success: function(data) {
        $('.div_imagetranscrits').html('<img src="data:image/png;base64,' + data + '" />');


    } );
