$(document).ready(function() {
	$("#logout").click(function(){

    $.ajax({
      url: '/logout',
      data: {
      },
      type: 'GET',
      success: function(data) {
        //$('where I want to put data').text(data);
        if(data === "loggedout")
          window.location.href = "/";
      },
      error: function(xhr, status, error) {
        console.log("Uh oh there was an error: " + error);
      }
    })

	});


});