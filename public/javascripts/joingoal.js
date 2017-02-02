$(document).ready(function() {

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

    var userlist;
	$.ajax({
        url: '/getUserlist',
        data: {
        },
        type: 'GET',
        success: function(data) {
            //$('where I want to put data').text(data);
            userlist = data;
        },
        error: function(xhr, status, error) {
            console.log("Uh oh there was an error: " + error);
        }
    });



	$(".joingoalselect ul li").click(function(){
		$(".joingoalselect").css({"display":"none","opacity":"0"});
		var goal = $(this).attr("id");
		var goalbodiesid = "#" + goal + "goals";
		$(goalbodiesid).css({"display":"block"});
		$(goalbodiesid).animate({"opacity":0.95}, "slow");
	});

	$(".goback").click(function(){
		$(".goalbodies").css({"display":"none","opacity":"0"});
		$(".joingoalselect").css({"display":"block"});
		$(".joingoalselect").animate({"opacity":0.95}, "slow");
		$(".othertasks").css({"display":"none","opacity":"0"});
		$(".goaladdedtext").text("");
	});

	$("span.right i").click(function() {
		var parentid = "";
		var thisid = "";
		var desiredid = "";
		$(".goaladdedtext").text("");
		parentid = $(this).parent('span').parent('p').attr('id'); 
		$(".othertasks").css({"display":"none", "opacity":"0"});
		for(a = 0; a < userlist.length; a++){
			for(b = 0; b < userlist[a].goals.length; b++){
				thisid = userlist[a].username + userlist[a].goals[b].goal_name.replace(/[\s']/g,'') + "info";
				if(thisid === parentid){
					desiredid = userlist[a].username + userlist[a].goals[b].goal_name.replace(/[\s']/g,'') + "tasks";
					$("#"+desiredid).css({"display":"block"});
					$("#"+desiredid).animate({'opacity':"1"}, "slow");
					return;
				}
			}
		}
	});

	$(".addgoal").click(function() {
		var siblingid = "";
		var thisid = "";
		var desiredid = "";
		$(".goaladdedtext").text("");
		parentid = $(this).parent('div').attr('id'); 
		console.log("parentid is " + parentid);
		for(a = 0; a < userlist.length; a++){
			for(b = 0; b < userlist[a].goals.length; b++){
				thisid = userlist[a].username + userlist[a].goals[b].goal_name.replace(/[\s']/g,'') + "tasks";
				if(thisid === parentid){
					//otheruser = userlist[a].username;
					//othergoalname = userlist[a].goals[b].goal_name;
					console.log(userlist[a].goals[b].goal_name + " is the goal name selected");
					addgoaltouser(userlist[a].username, userlist[a].goals[b].goal_name);
				}
			}
		}
	});

	addgoaltouser = function(otheruser, othergoalname, userlist) {
		for(i = 0; i < user.goals.length; i++){
			if(user.goals[i].goal_name === othergoalname){
				$(".goaladdedtext").append("<p>It appears you have a goal with the same name, please <a href='editgoal'>delete</a> that one if you wish to add this one<p>");
				return;
			}
		}

		if(user.goals.length > 7){
			$(".goaladdedtext").append("<p>It appears you already have 8 goals, please <a href='editgoal'>achieve or delete one</a> if you wish to add this one<p>");
			return;
		}

		$.ajax({
	        url: '/addotherusergoal',
	        data: {
	        	otheruser: otheruser,
	        	othergoalname: othergoalname,
	        },
	        type: 'POST',
	        success: function(data) {
	            if(data === "success")
  					$(".goaladdedtext").text("Goal successfully added! Go to your Your Goals page to view it!");
  				if(data === "usedgoalname")
  					$(".goaladdedtext").append("<p>It appears you have a goal with the same name, please <a href='editgoal'>delete</a> that one if you wish to add this one<p>");
  				if(data === "8goals")
  					$(".goaladdedtext").append("<p>It appears you already have 8 goals, please <a href='editgoal'>achieve or delete one</a> if you wish to add this one<p>");

	        },
	        error: function(xhr, status, error) {
	            console.log("Uh oh there was an error: " + error);
	        }
	    });

	}



});





























