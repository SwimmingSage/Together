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


	$(".goallist").click(function(){
		$(".tasktext").text("");
		$(".othertasks").css({"display":"none", "opacity":"0"});
		$(".goallist").css({"color" : "#ffa834"});
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


	$(".goalnavbar ul li").hover(function() {
		$(this).css({"background-color":"#606060", "transition":"0.2s", "cursor":"pointer"});
	}, function() {
		$(this).css({"background-color":"#444444"});
	});


	$('.dailytasksnavbutton').click(function() {
		$(".tasktext").text("");
		$(".dailytasksnavbutton").css({"color":"#ff6624"});
		$(".othersprogressnavbutton").css({"color":"#ffa834"});
		$(".othertasks").css({"display":"none", "opacity":"0"});
		navbarid = $(this).parent('ul').parent('div').attr('id');
		for(i = 0; i < user.goals.length; i++){
			id = user.goals[i].goal_name.replace(/[\s']/g,'') + "navbar";
			if(id === navbarid){
				$("#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"goalinfo .othersgoals").css({"display":"none", "opacity":"0"});
				$("#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"goalinfo .goaltasks").css({"display":"block"});
				$("#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"goalinfo .goaltasks").animate({'opacity': '1'}, "slow");
			}
		}
	});

	$('.othersprogressnavbutton').click(function() {
		$(".tasktext").text("");
		$(".dailytasksnavbutton").css({"color":"#ffa834"});
		$(".othersprogressnavbutton").css({"color":"#ff6624"});
		navbarid = $(this).parent('ul').parent('div').attr('id');
		for(i = 0; i < user.goals.length; i++){
			id = user.goals[i].goal_name.replace(/[\s']/g,'') + "navbar";
			if(id === navbarid){
				$("#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"goalinfo .goaltasks").css({"display":"none", "opacity":"0"});
				$("#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"goalinfo .othersgoals").css({"display":"block"});
				$("#"+user.goals[i].goal_name.replace(/[\s']/g,'')+"goalinfo .othersgoals").animate({'opacity': '1'}, "slow");
			}
		}
	});


	$(".othersgoals i#othershowmore").click(function() {
		var parentid = "";
		var thisid = "";
		var desiredid = "";
		parentid = $(this).parent('span').parent('p').attr('id'); 
		$(".othertasks").css({"display":"none", "opacity":"0"});
		for(i = 0; i < user.goals.length; i++){
			for(a = 0; a < userlist.length; a++){
				for(b = 0; b < userlist[a].goals.length; b++){
					thisid = user.goals[i].goal_name.replace(/[\s']/g,'') + userlist[a].username.replace(/[\s']/g,'') + userlist[a].goals[b].goal_name.replace(/[\s']/g,'') + "info";
					if(thisid === parentid){
						desiredid = user.goals[i].goal_name.replace(/[\s']/g,'') + userlist[a].username.replace(/[\s']/g,'') + userlist[a].goals[b].goal_name.replace(/[\s']/g,'') + "tasks";
						$("#"+desiredid).css({"display":"block"});
						$("#"+desiredid).animate({'opacity':"1"}, "slow");
						return;
					}
				}
			}
		}
	})



	$(".task i").click(function() {
		parentid = $(this).parent('p').attr('id');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		for(i = 0; i < user.goals.length; i++){
			for (x = 0; x < user.goals[i].tasks.length; x++){
				var taskidentifier = user.goals[i].goal_name.replace(/[\s']/g,'') + user.goals[i].tasks[x].name.replace(/[\s']/g,'');
				if(parentid === taskidentifier){
					var taskidentifierselect = "#" + user.goals[i].goal_name.replace(/[\s']/g,'') + user.goals[i].tasks[x].name.replace(/[\s']/g,'');
					$(taskidentifierselect).addClass('taskdone').removeClass('task');
					//make some message appear that they achieved their task
					AJAXPointUpdate(user.goals[i].goal_name, user.goals[i].tasks[x].name, user.goals[i].tasks[x].points);
					return;
				}
			}
		}
	});

	//function for routes AJAX updating user goal activity
	AJAXPointUpdate = function(goalname, taskcompleted, pointvalue) {
		$.ajax({
		    url: '/addpointsfortask',
		    data: {
		    	goalname: goalname,
		    	taskcompleted: taskcompleted,
		    	pointvalue: pointvalue,
		    },
		    type: 'POST',
		    success: function(data) {
				$("#user-points").text(data.points);
				$("#user-points-to-level").text(data.pointsToLevel);
				$("#user-level").text(data.level);
				console.log(data.streak);
				$("#"+goalname.replace(/[\s']/g,'')+"streak").text(data.streak + " day(s)");
				$(".tasktext").text("Great job achieving a daily task! You earned " + pointvalue + " points!");
				console.log(data.levelledup + " is the data.levelledup");
				if(data.levelledup){
					$('#levelup').css({"display":"block"});
					$('#levelup').animate({"opacity":"0.95"}, "slow");
				}
		    },
		    error: function(xhr, status, error) {
		        console.log("Uh oh there was an error: " + error);
		    }
		});
	};

	$(".closebox").click(function() {
		$('.useractionpopup').css({"display":"none", "opacity":"0"});
	});



});



/*
	$("#userloseweightgoal").click(function() {
		$(".goallist").css({"background-color" : "#444444"});
		$("#userloseweightgoal").css({"background-color" : "#606060"});
		$("#nogoalselected").css({'opacity': '0', 'display': 'none'});
		$('#loseweightgoalinformation').css({'display': 'block'});
		$('#loseweightgoalinformation').animate({'opacity': '0.95'}, "slow");
	});




	//function for routes AJAX updating user goal activity
	AJAXPointUpdate = function(taskcompleted, pointvalue) {
		$.ajax({
		    url: '/addpointsfortask',
		    data: {
		    	taskcompleted: taskcompleted,
		    	pointvalue: pointvalue,
		    },
		    type: 'POST',
		    success: function(data) {
		    	if(data = "success"){
						$.ajax({
							url: '/getnewstats',
							data: {
							},
							type: 'GET',
							success: function(data) {
								$("#user-points").text(data.points);
								$("#user-points-to-level").text(data.pointsToLevel);
								$("#user-level").text(data.level);
								$("#user-streak").text(data.streak + " day(s)");
							},
							error: function(xhr, status, error) {
								console.log("Uh oh there was an error: " + error);
							}
						})
					}
		    },
		    error: function(xhr, status, error) {
		        console.log("Uh oh there was an error: " + error);
		    }
		});
	};


	//Selectors of modals for lose weight goal

	$("p#walk15min.loseweighttask #icon").one("click", function() {
		$('#walk15minachieved').css({"display": "block"});
		$('#walk15minachieved').animate({'opacity': '0.95'}, "slow");
		$("#walk15min").addClass('loseweighttaskdone').removeClass('loseweighttask');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		AJAXPointUpdate("walk15min", 2);
	});

	$("#walk15minachieved .closebox").click(function() {
		$('#walk15minachieved').css({"display": "none", "opacity": 0});
	});


	$("#exercise30min #icon").one("click", function() {
		$('#exercise30minachieved').css({"display": "block"});
		$('#exercise30minachieved').animate({'opacity': '0.95'}, "slow");
		$("#exercise30min").addClass('loseweighttaskdone').removeClass('loseweighttask');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		AJAXPointUpdate("exercise30min", 5);
	});

	$("#exercise30minachieved .closebox").click(function() {
		$('#exercise30minachieved').css({"display": "none", "opacity": 0});
	});


	$("#proteinbreakfast #icon").one("click", function() {
		$('#proteinbreakfastachieved').css({"display": "block"});
		$('#proteinbreakfastachieved').animate({'opacity': '0.95'}, "slow");
		$("#proteinbreakfast").addClass('loseweighttaskdone').removeClass('loseweighttask');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		AJAXPointUpdate("proteinbreakfast", 2);
	});

	$("#proteinbreakfastachieved .closebox").click(function() {
		$('#proteinbreakfastachieved').css({"display": "none", "opacity": 0});
	});


	$("#nosugardrink #icon").one("click", function() {
		$('#nosugardrinkachieved').css({"display": "block"});
		$('#nosugardrinkachieved').animate({'opacity': '0.95'}, "slow");
		$("#nosugardrink").addClass('loseweighttaskdone').removeClass('loseweighttask');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		AJAXPointUpdate("nosugardrink", 3);
	});

	$("#nosugardrinkachieved .closebox").click(function() {
		$('#nosugardrinkachieved').css({"display": "none", "opacity": 0});
	});


	$("#highfiberfood #icon").one("click", function() {
		$('#highfiberfoodachieved').css({"display": "block"});
		$('#highfiberfoodachieved').animate({'opacity': '0.95'}, "slow");
		$("#highfiberfood").addClass('loseweighttaskdone').removeClass('loseweighttask');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		AJAXPointUpdate("highfiberfood", 2);
	});

	$("#highfiberfoodachieved .closebox").click(function() {
		$('#highfiberfoodachieved').css({"display": "none", "opacity": 0});
	});


	$("#skipdessert #icon").one("click", function() {
		$('#skipdessertachieved').css({"display": "block"});
		$('#skipdessertachieved').animate({'opacity': '0.95'}, "slow");
		$("#skipdessert").addClass('loseweighttaskdone').removeClass('loseweighttask');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		AJAXPointUpdate("skipdessert", 3);
	});

	$("#skipdessertachieved .closebox").click(function() {
		$('#skipdessertachieved').css({"display": "none", "opacity": 0});
	});


	$("#eatvegetable #icon").one("click", function() {
		$('#eatvegetableachieved').css({"display": "block"});
		$('#eatvegetableachieved').animate({'opacity': '0.95'}, "slow");
		$("#eatvegetable").addClass('loseweighttaskdone').removeClass('loseweighttask');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		AJAXPointUpdate("eatvegetable", 1);
	});

	$("#eatvegetableachieved .closebox").click(function() {
		$('#eatvegetableachieved').css({"display": "none", "opacity": 0});
	});


	$("#eatfruit #icon").one("click", function() {
		$('#eatfruitachieved').css({"display": "block"});
		$('#eatfruitachieved').animate({'opacity': '0.95'}, "slow");
		$("#eatfruit").addClass('loseweighttaskdone').removeClass('loseweighttask');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		AJAXPointUpdate("eatfruit", 1);
	});

	$("#eatfruitachieved .closebox").click(function() {
		$('#eatfruitachieved').css({"display": "none", "opacity": 0});
	});


	$("#hourssleep8 #icon").one("click", function() {
		$('#hourssleep8achieved').css({"display": "block"});
		$('#hourssleep8achieved').animate({'opacity': '0.95'}, "slow");
		$("#hourssleep8").addClass('loseweighttaskdone').removeClass('loseweighttask');
		$(this).replaceWith('<i class="fa fa-check-square-o fa-lg"></i>');
		AJAXPointUpdate("hourssleep8", 3);
	});

	$("#hourssleep8achieved .closebox").click(function() {
		$('#hourssleep8achieved').css({"display": "none", "opacity": 0});
	});
*/





















