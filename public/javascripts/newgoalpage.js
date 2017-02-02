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

  var letters= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var validcharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'- ";
  var currentgoalselection = "";



  /* Pop Up no more goals if user has no goals remaining */

  showpopup = function(){
    $('.outofgoals').css({"display": "block"});
    $('.outofgoals').animate({'opacity': '0.95'}, "slow");
  }

  $(".outofgoals .closebox").click(function() {
    $('.outofgoals').css({"display": "none", "opacity": 0});
  });

  /* The lose weight goal exception */
  $('#loseweight').click( function(){
    if(user.goals.length > 7){
      showpopup();
      return;
    }
  	$('#newgoalbody').css({'opacity': '0', 'display': 'none'});
    $('#loseweightgoal').css({'display': 'block'});
    $('#loseweightgoal').animate({'opacity': '0.92'}, "slow");
    currentgoalselection = "loseweightgoal";
  });

  $('#loseweightback').click( function(){
    $('#unfilledsections').hide();
    $('#invalidweight').hide();
    $('#invalidweightloss').hide();
    $('#goalnameused1').hide();
    $('#badsymbols1').hide();
    $('#goalstartwithletter1').hide();
  	$('#loseweightgoal').css({'opacity': '0', 'display': 'none'})
    $('#newgoalbody').css({'display': 'block'});
    $('#newgoalbody').animate({'opacity': '.92'}, "slow");
    $('#loseweightgoalname').val("");
    $('#currentweight').val("");
    $('#loseweightamount').val("");
    $('.dailytaskname').val('');
    $('.dailytaskpoint').val('');
    currentgoalselection = "";
  });

  $('#loseweightaddtasks').click( function(){
    $('#unfilledsections').hide();
    $('#invalidweight').hide();
    $('#invalidweightloss').hide();
    $('#goalnameused1').hide();
    $('#badsymbols1').hide();
    $('#goalstartwithletter1').hide();

    currentweight = Number($('#currentweight').val());
    loseweightamount = Number($('#loseweightamount').val());
    loseweightgoalname = $('#loseweightgoalname').val();

    if(currentweight.length === 0 || loseweightamount.length === 0 || loseweightgoalname.length === 0){
      $('#unfilledsections').show();

      return;
    }
    if(currentweight <= 0 || currentweight > 700){
      $('#invalidweight').show();
      $('#currentweight').val("");
      return;
    }
    if(loseweightamount <= 0 || loseweightamount >= currentweight){
      $('#invalidweightloss').show();
      $('#invalidweightloss').val("");
      return;
    }

    if(checkifgoalnametaken(loseweightgoalname)){
      $('#goalnameused1').show();
      return;
    }
    //var letters= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    //var validcharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'- ";

    //where i need to check that the goal name contains valid characters

    for(x = 0; x < loseweightgoalname.length; x++){
      if(!validcharacters.includes(loseweightgoalname[x])){
        $('#badsymbols1').show();
        return;
      }
      if(x === 0){
        if(!letters.includes(loseweightgoalname[x])){
          $('#goalstartwithletter1').show();
          return;
        }
      }
    }


    $('#loseweightgoal').css({'opacity': '0', 'display': 'none'});
    $('.addtasks').css({'display': 'block'});
    $('.addtasks').animate({'opacity': '0.95'}, "slow");
  });

  //End of lose weight goal exception





  //Every other goal set up

  clearScreenForGoal = function(){
    if(user.goals.length > 7){
      showpopup();
      return;
    }
    $('#newgoalbody').css({'opacity': '0', 'display': 'none'});
    $('#othergoalstart').css({'display': 'block'});
    $('#othergoalstart').animate({'opacity': '0.95'}, "slow");
  }

  $('#breakhabit').click( function(){
    clearScreenForGoal();
    currentgoalselection = "breakhabitgoal";
  });

  $('#formhabit').click( function(){
    clearScreenForGoal();
    currentgoalselection = "formhabitgoal";
  });

  $('#learnskill').click( function(){
    clearScreenForGoal();
    currentgoalselection = "learnskillgoal";
  });

  $('#fitnessgoal').click( function(){
    clearScreenForGoal();
    currentgoalselection = "fitnessgoal";
  });

  $('#othergoal').click( function(){
    clearScreenForGoal();
    currentgoalselection = "uniquegoal";
  });


  $('#othergoalback').click( function(){
    $('#unfilledgoalname').hide();
    $('#goalnameused2').hide();
    $('#badsymbols2').hide();
    $('#goalstartwithletter2').hide();

    $('#othergoalstart').css({'opacity': '0', 'display': 'none'});
    $('#newgoalbody').css({'display': 'block'});
    $('#newgoalbody').animate({'opacity': '0.92'}, "slow");

    $('#goalname').val("");
    $('.dailytaskname').val('');
    $('.dailytaskpoint').val('');

    currentgoalselection = "";
  });


  $('#goaladdtasks').click( function(){
    $('#unfilledgoalname').hide();
    $('#goalnameused2').hide();
    $('#badsymbols2').hide();
    $('#goalstartwithletter2').hide();

    goalname = $('#goalname').val();

    if(goalname.length === 0){
      $('#unfilledgoalname').show();
      return;
    }
    if(checkifgoalnametaken(goalname)){
      $('#goalnameused2').show();
      return;
    }

    //var letters= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    //var validcharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'- ";

    //Where I am going to check whether the goal contains valid letters

    for(x = 0; x < goalname.length; x++){
      if(!validcharacters.includes(goalname[x])){
        $('#badsymbols2').show();
        return;
      }
      if(x === 0){
        if(!letters.includes(goalname[x])){
          $('#goalstartwithletter2').show();
          return;
        }
      }
    }



    $('#othergoalstart').css({'opacity': '0', 'display': 'none'});
    $('.addtasks').css({'display': 'block'});
    $('.addtasks').animate({'opacity': '0.95'}, "slow");
  });


  // Check if goal name taken
  checkifgoalnametaken = function(goalname){
    for(i = 0; i < user.goals.length; i++){
      if(user.goals[i].goal_name === goalname){
        return true;
      } else if(i === (user.goals.length - 1)){
        return false;
      }
    }
  }




  //End of every other goal setup




  // daily tasks back
  $('#dailytasksback').click( function(){
    $('#invalidtasks').hide();
    $('#invalidtotalpoints').hide();
    $('#taskandptsneeded').hide();
    $('#invalidpointstask').hide();
    $('#invalidpointstasknumber').hide();
    $('#twotaskssamename').hide();
    $('#goaltasksamename').hide();
    $('#taskcontainsbadcharacter').hide();
    $('#taskstartwithletter').hide();

    $('.addtasks').css({'opacity': '0', 'display': 'none'});


    if(currentgoalselection === "loseweightgoal"){
      $('#loseweightgoal').css({'display': 'block'});
      $('#loseweightgoal').animate({'opacity': '0.92'}, "slow");
    } else{
      $('#othergoalstart').css({'display': 'block'});
      $('#othergoalstart').animate({'opacity': '0.92'}, "slow");
    }

  });



  //Add a goal


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



  $('#submitgoal').click( function() {
    $('#invalidtasks').hide();
    $('#invalidtotalpoints').hide();
    $('#taskandptsneeded').hide();
    $('#invalidpointstask').hide();
    $('#invalidpointstasknumber').hide();
    $('#twotaskssamename').hide();
    $('#goaltasksamename').hide();
    $('#taskcontainsbadcharacter').hide();
    $('#taskstartwithletter').hide();

    goaltype = currentgoalselection;
    if(currentgoalselection === "loseweightgoal"){
      goalname = $("#loseweightgoalname").val();
      currentweight = Number($("#currentweight").val());
      weighttolose = Number($("#loseweightamount").val());
    } else{
      goalname = $("#goalname").val();
      currentweight = 0;
      weighttolose = 0;
    }

    task1 = $("#dailytask1").val();
    task1pts = Number($("#dailytask1points").val());
    task2 = $("#dailytask2").val();
    task2pts = Number($("#dailytask2points").val());
    task3 = $("#dailytask3").val();
    task3pts = Number($("#dailytask3points").val());
    task4 = $("#dailytask4").val();
    task4pts = Number($("#dailytask4points").val());
    task5 = $("#dailytask5").val();
    task5pts = Number($("#dailytask5points").val());
    task6 = $("#dailytask6").val();
    task6pts = Number($("#dailytask6points").val());
    task7 = $("#dailytask7").val();
    task7pts = Number($("#dailytask7points").val());
    task8 = $("#dailytask8").val();
    task8pts = Number($("#dailytask8points").val());


    if(checkif1taskptsfilled(task1, task1pts) && checkif1taskptsfilled(task2, task2pts) && checkif1taskptsfilled(task3, task3pts) && checkif1taskptsfilled(task4, task4pts) && checkif1taskptsfilled(task5, task5pts) && checkif1taskptsfilled(task6, task6pts) && checkif1taskptsfilled(task7, task7pts) && checkif1taskptsfilled(task8, task8pts)){
      $('#invalidtasks').show();
      return;
    }

    if(checkiftaskhaspts(task1, task1pts) || checkiftaskhaspts(task2, task2pts) || checkiftaskhaspts(task3, task3pts) || checkiftaskhaspts(task4, task4pts) || checkiftaskhaspts(task5, task5pts) || checkiftaskhaspts(task6, task6pts) || checkiftaskhaspts(task7, task7pts) || checkiftaskhaspts(task8, task8pts)){
      $('#taskandptsneeded').show();
      return;
    }

    if(checkifvalidpts(task1, task1pts) || checkifvalidpts(task2, task2pts) || checkifvalidpts(task3, task3pts) || checkifvalidpts(task4, task4pts) || checkifvalidpts(task5, task5pts) || checkifvalidpts(task6, task6pts) || checkifvalidpts(task7, task7pts) || checkifvalidpts(task8, task8pts)){
      $('#invalidpointstask').show();
      return;
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
      $('#currentpoints').text(totalpoints);
      $('#invalidtotalpoints').show();
      $('#invalidpointstasknumber').show();
      return;
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
            $('#twotaskssamename').show();
            return;
          }
        }
        if(taskswithnames[i] === goalname){
          $('#goaltasksamename').show();
          return;
        }
        for(a = 0; a < taskswithnames[i].length; a++){
          if(!validcharacters.includes(taskswithnames[i][a])){
            $('#taskcontainsbadcharacter').show();
            return;
          }
          if(a === 0){
            if(!letters.includes(taskswithnames[i][a])){
              $('#taskstartwithletter').show();
              return;
            }
          }
        }
      }
    }


    $.ajax({
      url: '/creategoal',
      data: {
        goal_type:         goaltype,
        goal_name:         goalname,
        current_weight:    currentweight,
        weight_to_lose:    weighttolose,
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
        if(data === "success")
          window.location.href = "/yourgoals";
      },
      error: function(xhr, status, error) {
        console.log("Uh oh there was an error: " + error);
      }
    })


  });

});