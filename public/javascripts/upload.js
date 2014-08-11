function getCurrentTime(){
    return (new Date().toString()).replace(/(.*)GMT(.*)/, function($,$1){return $1});
}

var messageZone = $('#messageZone');
messageZone.css("display","none");
var closeButton = '<button type="button" class="close" data-dismiss="alert">'
        + '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';

$('#uploadZone').on('drop', function(event) {
	var file = event.originalEvent.dataTransfer.files[0];

        if(!/\.md$/.test(file.name)){
           //console.log('please upload *.md file');
           messageZone.get(0).innerHTML = closeButton + getCurrentTime() + '<strong style="padding-left:10px;"> Please upload *.md file.</strong>';
           messageZone.css("display","block");
           messageZone.removeClass().addClass('alert alert-warning alert-dismissible');
           return false;
        }
       
	var formData = new FormData();
	formData.append('file', file);
		
	$.ajax('/upload', {
		method: 'POST',
		contentType: false,
		processData: false,
		data:formData,
		error: function(xhr, error) {
		   //console.log('upload failed');
           messageZone.get(0).innerHTML = closeButton + getCurrentTime() + '<strong style="padding-left:10px;">Sorry, upload file failed.</strong>';
           messageZone.css("display","block");
           messageZone.removeClass().addClass('alert alert-warning alert-dismissible');
		   //console.log(error);
		},
		success: function(response) {
           //console.log('upload success');
           messageZone.get(0).innerHTML = closeButton + getCurrentTime() + '<strong style="padding-left:10px;"> Upload file success,' + ' open '
                      + '<a href="/' + response + '">' + response + '</a></strong>';
           messageZone.css("display","block");
           messageZone.removeClass().addClass('alert alert-success alert-dismissible');
           //console.log(response);
		}
	});

	return false;
				
}).on('dragover', function(event) {
	return false;
});
