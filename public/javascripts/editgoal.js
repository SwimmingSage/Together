$(document).ready(function() {


  var letters= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  var validcharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'- ";
	var currentsubmitmode;
  var user;
  $.ajax({
        url: '/getUser',
        data: {
        },
        type: 'GET',
        success: function(data) {
            //$('where I want to put data').text(data);
            user = data;
        },
        error: function(xhr, status, error) {
            console.log("Uh oh there was an error: " + error);
        }
    });


	$(".goallist").click(function(){
	   	$(".error").hide();
	   	$(".success").hide();
		$(".othertasks").css({"display":"none", "opacity":"0"});
		$(".goallist").css({"color" : "#ffa834"});
		$(".error").css({"display":"none"});

		$(this).css({"color" : "#ff6624"});
		for(i = 0; i < user.goals.length; i++){
			identifier = "#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"goalinfo";
			if(user.goals[i].goal_name.replace(/[\s']/g,'') != this.id){
				$(identifier).css({"display": "none", "opacity": 0});
				goalnavid = "#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"navbar";
			} else {
				$("#nogoalselected").css({'opacity': '0', 'display': 'none'});
				$(identifier).css({"display": "block"});
				$(identifier).animate({'opacity': '0.95'}, "slow");
				goalnavid = "#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"navbar";
				$(goalnavid+" ul li.dailytasksnavbutton").css({"color":"#ff6624"});
				$(goalnavid+" ul li.othersprogressnavbutton").css({"color":"#ffa834"});
				$("#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"goalinfo .goaltasks").css({"display":"block", "opacity":"1"});
				$("#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"goalinfo .othersgoals").css({"display":"none", "opacity":"0"});
			}
		}
	})

	$(".goallist").hover(function() {
		$(this).css({"background-color":"#606060", "transition":"0.2s"});
	}, function() {
		$(this).css({"background-color":"#444444"});
	});

	$(".submit").click(function(){
		var thisid = "";
		var divid = $(this).parent('li').parent('ul').parent('div').attr('id');
		for(i = 0; i < user.goals.length; i++){
			thisid = user.goals[i].goal_name.replace(/[\s']/g,'') + "box";
			if(thisid === divid){
				currentsubmitmode = user.goals[i].goal_name;
				console.log("The currentsubmitmode is " + currentsubmitmode);
				if(verifyvalues()){
					$("#editgoalswarning").css({"display":"block"});
					$("#editgoalswarning").animate({'opacity': '0.95'}, "slow");
				}
			}
		}
	});

  $(".useractionpopup .closebox").click(function() {
    $('.useractionpopup').css({"display": "none", "opacity": 0});
  });

  $(".deletegoal").click(function(){
    var thisid = "";
    var divid = $(this).parent('li').parent('ul').parent('div').attr('id');
    for(i = 0; i < user.goals.length; i++){
      thisid = user.goals[i].goal_name.replace(/[\s']/g,'') + "box";
      if(thisid === divid){
        currentsubmitmode = user.goals[i].goal_name;
        console.log("The currentsubmitmode is " + currentsubmitmode);
        $("#deletegoalswarning").css({"display":"block"});
        $("#deletegoalswarning").animate({'opacity': '0.95'}, "slow");
      }
    }
  });

  $(".delete").click(function(){
    goalname = currentsubmitmode;
    $.ajax({
      url: '/deletegoal',
      data: {
        goal_name:         goalname,
      },
      type: 'POST',
      success: function(data) {
        if(data === "success")
          window.location.href = "/yourgoals";
        if(data === "outofgoals"){
          $('.useractionpopup').css({"display": "none", "opacity": 0});
          $("#outofdeletegoalswarning").css({"display":"block"});
          $("#outofdeletegoalswarning").animate({'opacity': '0.95'}, "slow");
        }

      },
      error: function(xhr, status, error) {
        console.log("Uh oh there was an error: " + error);
      }
    })

  })

  $(".goalachieved").click(function(){
    var thisid = "";
    var divid = $(this).parent('li').parent('ul').parent('div').attr('id');
    for(i = 0; i < user.goals.length; i++){
      thisid = user.goals[i].goal_name.replace(/[\s']/g,'') + "box";
      if(thisid === divid){
        currentsubmitmode = user.goals[i].goal_name;
      }
    }
    $.ajax({
      url: '/achievegoal',
      data: {
        goal_name:         currentsubmitmode,
      },
      type: 'POST',
      success: function(data) {
        if(data === "success")
          $("#achievegoalsmessage").css({"display":"block"});
          $("#achievegoalsmessage").animate({'opacity': '0.95'}, "slow");
        if(data === "outofgoals"){
          $('.useractionpopup').css({"display": "none", "opacity": 0});
          $("#outofdeletegoalswarning").css({"display":"block"});
          $("#outofdeletegoalswarning").animate({'opacity': '0.95'}, "slow");
        }

      },
      error: function(xhr, status, error) {
        console.log("Uh oh there was an error: " + error);
      }
    })

  })



  checkif1taskptsfilled = function(task, taskpts){
    if(task != "" && taskpts != 0){
      return false;
    } else{
      return true;
    }
  }
  
  checkiftaskhaspts = function(task, taskpts){
    if((task != "" && taskpts === 0) || (task === "" && taskpts != 0)){
      return true;
    } else{
      return false;
    }
  }

  checkifvalidpts = function(task, taskpts){
    if((task != "" && taskpts < 1) || (task != "" && taskpts > 4)){
      return true;
    } else{
      return false;
    }
  }

  var totalpoints = 0;
  addtototalpoints = function(taskpts){
    totalpoints += taskpts;
  }

  verifyvalues = function() {
  	goalname = currentsubmitmode;
    $('#'+goalname.replace(/[\s']/g,'')+'invalidtasks').hide();
    $('#'+goalname.replace(/[\s']/g,'')+'invalidtotalpoints').hide();
    $('#'+goalname.replace(/[\s']/g,'')+'taskandptsneeded').hide();
    $('#'+goalname.replace(/[\s']/g,'')+'invalidpointstask').hide();
    $('#'+goalname.replace(/[\s']/g,'')+'invalidpointstasknumber').hide();
    $('#'+goalname.replace(/[\s']/g,'')+'twotaskssamename').hide();
    $('#'+goalname.replace(/[\s']/g,'')+'goaltasksamename').hide();
    $('#'+goalname.replace(/[\s']/g,'')+'taskcontainsbadcharacter').hide();
    $('#'+goalname.replace(/[\s']/g,'')+'taskstartwithletter').hide();

    var task1 = $("#"+goalname.replace(/[\s']/g,'') + "newtask0name").val();
    var task1pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask0points").val());
    var task2 = $("#"+goalname.replace(/[\s']/g,'') + "newtask1name").val();
    var task2pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask1points").val());
    var task3 = $("#"+goalname.replace(/[\s']/g,'') + "newtask2name").val();
    var task3pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask2points").val());
    var task4 = $("#"+goalname.replace(/[\s']/g,'') + "newtask3name").val();
    var task4pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask3points").val());
    var task5 = $("#"+goalname.replace(/[\s']/g,'') + "newtask4name").val();
    var task5pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask4points").val());
    var task6 = $("#"+goalname.replace(/[\s']/g,'') + "newtask5name").val();
    var task6pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask5points").val());
    var task7 = $("#"+goalname.replace(/[\s']/g,'') + "newtask6name").val();
    var task7pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask6points").val());
    var task8 = $("#"+goalname.replace(/[\s']/g,'') + "newtask7name").val();
    var task8pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask7points").val());


    if(checkif1taskptsfilled(task1, task1pts) && checkif1taskptsfilled(task2, task2pts) && checkif1taskptsfilled(task3, task3pts) && checkif1taskptsfilled(task4, task4pts) && checkif1taskptsfilled(task5, task5pts) && checkif1taskptsfilled(task6, task6pts) && checkif1taskptsfilled(task7, task7pts) && checkif1taskptsfilled(task8, task8pts)){
      $('#'+goalname.replace(/[\s']/g,'')+'invalidtasks').show();
      return false;
    }

    if(checkiftaskhaspts(task1, task1pts) || checkiftaskhaspts(task2, task2pts) || checkiftaskhaspts(task3, task3pts) || checkiftaskhaspts(task4, task4pts) || checkiftaskhaspts(task5, task5pts) || checkiftaskhaspts(task6, task6pts) || checkiftaskhaspts(task7, task7pts) || checkiftaskhaspts(task8, task8pts)){
      $('#'+goalname.replace(/[\s']/g,'')+'taskandptsneeded').show();
      return false;
    }

    if(checkifvalidpts(task1, task1pts) || checkifvalidpts(task2, task2pts) || checkifvalidpts(task3, task3pts) || checkifvalidpts(task4, task4pts) || checkifvalidpts(task5, task5pts) || checkifvalidpts(task6, task6pts) || checkifvalidpts(task7, task7pts) || checkifvalidpts(task8, task8pts)){
      $('#'+goalname.replace(/[\s']/g,'')+'invalidpointstask').show();
      return false;
    }


    totalpoints = 0;

    addtototalpoints(task1pts);
    addtototalpoints(task2pts);
    addtototalpoints(task3pts);
    addtototalpoints(task4pts);
    addtototalpoints(task5pts);
    addtototalpoints(task6pts);
    addtototalpoints(task7pts);
    addtototalpoints(task8pts);

    if(totalpoints > 17){
      $('#'+goalname.replace(/[\s']/g,'')+'currentpoints').text(totalpoints);
      $('#'+goalname.replace(/[\s']/g,'')+'invalidtotalpoints').show();
      $('#'+goalname.replace(/[\s']/g,'')+'invalidpointstasknumber').show();
      return false;
    }



    var taskswithnames = [];
    if(task1 !== "")
      taskswithnames.push(task1);
    if(task2 !== "")
      taskswithnames.push(task2);
    if(task3 !== "")
      taskswithnames.push(task3);
    if(task4 !== "")
      taskswithnames.push(task4);
    if(task5 !== "")
      taskswithnames.push(task5);
    if(task6 !== "")
      taskswithnames.push(task6);
    if(task7 !== "")
      taskswithnames.push(task7);
    if(task8 !== "")
      taskswithnames.push(task8);

    //var letters= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    //var validcharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'- ";

    console.log(taskswithnames);
    for(i = 0; i < taskswithnames.length; i++){
      for(x = 0; x < taskswithnames.length; x++){
        if(i !== x){
          console.log(taskswithnames[i] + " is taskswithnames[i] at i = " + i);
          console.log(taskswithnames[x] + " is taskswithnames[x] at x = " + x);
          if(taskswithnames[i] === taskswithnames[x]){
            $('#'+goalname.replace(/[\s']/g,'')+'twotaskssamename').show();
            return false;
          }
        }
        if(taskswithnames[i] === goalname){
          $('#'+goalname.replace(/[\s']/g,'')+'goaltasksamename').show();
          return false;
        }
        for(a = 0; a < taskswithnames[i].length; a++){
          if(!validcharacters.includes(taskswithnames[i][a])){
            $('#'+goalname.replace(/[\s']/g,'')+'taskcontainsbadcharacter').show();
            return false;
          }
          if(a === 0){
            if(!letters.includes(taskswithnames[i][a])){
              $('#'+goalname.replace(/[\s']/g,'')+'taskstartwithletter').show();
              return false;
            }
          }
        }
      }
    }

    return true;

  };


  $("button.continue").click(function() {
  	goalname = currentsubmitmode;

    console.log("This is running");

    var task1 = $("#"+goalname.replace(/[\s']/g,'') + "newtask0name").val();
    var task1pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask0points").val());
    var task2 = $("#"+goalname.replace(/[\s']/g,'') + "newtask1name").val();
    var task2pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask1points").val());
    var task3 = $("#"+goalname.replace(/[\s']/g,'') + "newtask2name").val();
    var task3pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask2points").val());
    var task4 = $("#"+goalname.replace(/[\s']/g,'') + "newtask3name").val();
    var task4pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask3points").val());
    var task5 = $("#"+goalname.replace(/[\s']/g,'') + "newtask4name").val();
    var task5pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask4points").val());
    var task6 = $("#"+goalname.replace(/[\s']/g,'') + "newtask5name").val();
    var task6pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask5points").val());
    var task7 = $("#"+goalname.replace(/[\s']/g,'') + "newtask6name").val();
    var task7pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask6points").val());
    var task8 = $("#"+goalname.replace(/[\s']/g,'') + "newtask7name").val();
    var task8pts = Number($("#"+goalname.replace(/[\s']/g,'') + "newtask7points").val());

    $.ajax({
      url: '/editusergoal',
      data: {
        goal_name:         goalname,
        task1name:         task1,
        task1points:       task1pts,
        task2name:         task2,
        task2points:       task2pts,
        task3name:         task3,
        task3points:       task3pts,
        task4name:         task4,
        task4points:       task4pts,
        task5name:         task5,
        task5points:       task5pts,
        task6name:         task6,
        task6points:       task6pts,
        task7name:         task7,
        task7points:       task7pts,
        task8name:         task8,
        task8points:       task8pts,
      },
      type: 'POST',
      success: function(data) {
        if(data === "success"){
          console.log("It was a success");
          $(".success").show();
      	  $("#editgoalswarning").css({"display":"none","opacity":"0"});
        }

      },
      error: function(xhr, status, error) {
        console.log("Uh oh there was an error: " + error);
      }
    })
  })





});
















