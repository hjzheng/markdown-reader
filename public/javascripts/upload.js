function getCurrentTime(){
    return (new Date().toString()).replace(/(.*)GMT(.*)/, function($,$1){return $1});
}

var messageZone = $('#messageZone');
messageZone.css("display","none");
var closeButton = '<button type="button" class="close" data-dismiss="alert">'
        + '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';

function showMessage(msg, classStr){
   messageZone.get(0).innerHTML = closeButton + getCurrentTime() + msg;
   messageZone.css("display","block");
   messageZone.removeClass().addClass(classStr);
}

$('#uploadZone').on('drop', function(event) {
	var file = event.originalEvent.dataTransfer.files[0];

        if(!/\.md$/.test(file.name)){
           //console.log('please upload *.md file');
           var msg = '<strong style="padding-left:10px;"> Please upload *.md file.</strong>';
           var classStr = 'alert alert-warning alert-dismissible';
           showMessage(msg, classStr);
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
           var msg = '<strong style="padding-left:10px;">Sorry, upload file failed.</strong>';
           var classStr = 'alert alert-warning alert-dismissible';
           showMessage(msg, classStr);
		   //console.log(error);
		},
		success: function(response) {
           //console.log('upload success');
           var msg = '<strong style="padding-left:10px;"> Upload file success,' + ' open '
              + '<a href="/' + response + '">' + response + '</a></strong>';
           var classStr = 'alert alert-success alert-dismissible';
           showMessage(msg, classStr);
           //console.log(response);
		}
	});

	return false;
				
}).on('dragover', function(event) {
	return false;
});

$("#shrinkButton").on('click', function(){
  var listDiv = $(this).parent().prev();
  var contentDiv = $(this).parent();
  var icon = $(this).children();
  if(listDiv.css('display') != 'none'){
      icon.removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-right');
      listDiv.css('display', 'none');
      contentDiv.removeClass().addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12 markdown-body mdContent');
  }else{
      icon.removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-left');
      listDiv.css('display', 'block');
      contentDiv.removeClass().addClass('col-lg-9 col-md-9 col-sm-8 col-xs-7 markdown-body mdContent');
  }
});

var eleTop = parseInt($("#shrinkButton").css('top'));

$(window).scroll(function() {
   var scrollTop = $(document).scrollTop();
   //var pTop = $(".mdContent").offset().top;
   $("#shrinkButton").css('top', (scrollTop + eleTop) + "px");
});
