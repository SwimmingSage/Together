var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = require('express').Router();
var mongoose = require('mongoose')

var User = mongoose.model('User');
var goal = mongoose.model('goal');
var task = mongoose.model('tasks');



/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.render('loginhome', {user: req.user});
  } else {
    res.render('index', { title: 'Together' });
  }
});

router.get('/loginhome', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.render('loginhome', {user: req.user});
  } else {
    res.redirect('/');
  }
});

router.get('/yourgoals', function(req, res, next) {
  if(req.isAuthenticated()) {
    var userlist;
    grabuserlist = function() {
      User.find(function(err, Users){
        if(err){
          console.log("An error happened here");
        }
        userlist = Users.map(function(d){ return d.toObject() });
        res.render("yourgoals", {user: req.user, userlist: userlist});
      });
    }

    grabuserlist()
  } else {
    res.redirect('/');
  }
});

/* Edit goal */

router.get('/editgoal', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.render('editgoal', {user: req.user});
  } else {
    res.redirect('/');
  }
});


router.post('/editusergoal', function(req, res, next) {
  findgoal = function(){
    console.log("findgoal entered");
    for(i = 0; i < req.user.goals.length; i++){
      var tasklength = req.user.goals[i].tasks.length;
      var indexnumber = i;
      if(req.user.goals[i].goal_name === req.body.goal_name)
        for(x = 0; x < tasklength; x++){
          req.user.goals[i].tasks.pop();
          if(x === (tasklength - 1)){
            return new Promise(function(resolve, reject){
              resolve(req.user.goals[indexnumber]);
            });
          }
        }
    }
  }


  creategoalinuser = function(){
    findgoal()
    .then(goal => {
      addtasktotasks = function(taskname, taskpoints) {
        if(taskname != ""){
          var new_task = new task({
            achieved:           true, 
            name:               taskname,
            points:             taskpoints,
          })
          goal.tasks.push(new_task);
        }
      }
      addtasktotasks(req.body.task1name, req.body.task1points);
      addtasktotasks(req.body.task2name, req.body.task2points);
      addtasktotasks(req.body.task3name, req.body.task3points);
      addtasktotasks(req.body.task4name, req.body.task4points);
      addtasktotasks(req.body.task5name, req.body.task5points);
      addtasktotasks(req.body.task6name, req.body.task6points);
      addtasktotasks(req.body.task7name, req.body.task7points);
      addtasktotasks(req.body.task8name, req.body.task8points);
      return goal;
    })
    //.then(goal => { goal.save(); return goal; })
    .then(() => req.user.save())
    .then(() => { res.send("success") })
    .catch(error => { console.log(error) });
  }
  creategoalinuser();
});


/* End of edit goal */

/* Achieve goal */
router.post('/achievegoal', function(req, res, next) {
  goalname = req.body.goal_name
  getnewgoallist = function() {
    newgoallist = [];
    return new Promise(function(resolve, reject){
      for(a = 0; a < req.user.goals.length; a++){
        console.log("The name to match is " + req.body.goal_name);
        if(req.user.goals[a].goal_name === req.body.goal_name){
          console.log("The non add if ran for " + req.user.goals[a].goal_name);
          req.user.goals_to_delete = (Number(req.user.goals_to_delete) - 1);
          req.user.goals_achieved.push(req.user.goals[a]);
          req.user.save();
        } else if(req.user.goals[a].goalname != req.body.goal_name){
          console.log("I added " + req.user.goals[a].goal_name);
          newgoallist.push(req.user.goals[a])
          console.log(newgoallist + " is the newgoallist");
        }
        if( a === (req.user.goals.length -1)){
          req.user.goals = newgoallist;
          resolve();
        }
      }
    });
  }
  if(req.user.goals_to_delete > 0){
    getnewgoallist()
    .then(() => { req.user.save()})
    .then(() => { res.send('success')})
    .catch(error => { console.log(error) });
  } else {
    res.send("outofgoals");
  }
});

/* Delete goal */
router.post('/deletegoal', function(req, res, next){
  goalname = req.body.goal_name
  getnewgoallist = function() {
    newgoallist = [];
    return new Promise(function(resolve, reject){
      for(a = 0; a < req.user.goals.length; a++){
        console.log("req.user.goals[a] is " + req.user.goals[a]);
        console.log("req.body.goalname is " + req.body.goal_name);
        if(req.user.goals[a].goal_name === req.body.goal_name){
          req.user.goals_to_delete = (Number(req.user.goals_to_delete) - 1);
          req.user.save();
        } else if(req.user.goals[a].goalname != goalname){
          newgoallist.push(req.user.goals[a])
        }
        if( a === (req.user.goals.length -1)){
          resolve(newgoallist);
        }
      }
    });
  }
  if(req.user.goals_to_delete > 0){
    getnewgoallist()
    .then(goallist => { req.user.goals = goallist})
    .then(() => { req.user.save()})
    .then(() => { res.send('success')})
    .catch(error => { console.log(error) });
  } else {
    res.send("outofgoals");
  }
});


//I could add every goal to the list except for the deleted one and then save that list to the user.goals



/* End of delete goal */




router.get('/newgoal', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.render('newgoal', {user: req.user});
  } else {
    res.redirect('/');
  }
});


// Join goals code

router.get('/joingoal', function(req, res, next) {
  if(req.isAuthenticated()) {
    var userlist;
    grabuserlist = function() {
      User.find(function(err, Users){
        if(err){
          console.log("An error happened here");
        }
        userlist = Users.map(function(d){ return d.toObject() });
        res.render("joingoal", {user: req.user, userlist: userlist, goaltypes: ["loseweightgoal", "breakhabitgoal", "formhabitgoal", "learnskillgoal", "fitnessgoal", "uniquegoal"]});
      });
    }
    grabuserlist();
  } else {
    res.redirect('/');
  }
});

router.post('/addotherusergoal', function(req, res, next) {
  console.log("We got in /addotherusergoal");
  //var otheruser = req.body.otheruser;
  //var othergoalname = req.body.othergoalname
  var otherusergoal;
  checkifaddable = function(otheruser, othergoalname){
    console.log("In checkifaddable");
    console.log(req.user.goals.length);
    console.log(req.user.goals);
    if(req.user.goals.length > 7){
      res.send("8goals");
    }else if(req.user.goals.length === 0){
      return new Promise(function(resolve, reject){
          User.findOne({username: otheruser}, function(err, otheruserinfo){
            if (err){ console.log("An error happened while grabbing otheruserinfo") }

            for(i = 0; i < otheruserinfo.goals.length; i++){
              if(otheruserinfo.goals[i].goal_name === othergoalname){
                console.log("A goal was matched");
                console.log(otheruserinfo.goals[i] + " is the goal");
                //otherusergoal = otheruserinfo.goals[i];
                resolve(otheruserinfo.goals[i])
              }
            }
            reject(new Error("didn't match goal"));
          });
        })
    }else{
      for(x = 0; x < req.user.goals.length; x++){
        console.log("Iteration begain in first for loop")
        console.log("i is " + i);
        console.log(req.user.goals[x].goal_name + " is req.user.goals[x].goal_name");
        console.log(othergoalname + " is othergoalname");
        if(req.user.goals[x].goal_name === othergoalname){
          res.send("usedgoalname");
          return;
        } else if(x === (req.user.goals.length - 1)){
          console.log("in else if");
          return new Promise(function(resolve, reject){
            User.findOne({username: otheruser}, function(err, otheruserinfo){
              if (err){ console.log("An error happened while grabbing otheruserinfo") }

              for(i = 0; i < otheruserinfo.goals.length; i++){
                if(otheruserinfo.goals[i].goal_name === othergoalname){
                  console.log("A goal was matched");
                  console.log(otheruserinfo.goals[i] + " is the goal");
                  //otherusergoal = otheruserinfo.goals[i];
                  resolve(otheruserinfo.goals[i])
                }
              }
              reject(new Error("didn't match goal"));
            });
          })
        }
      }
    }

  }
  checkifaddable(req.body.otheruser, req.body.othergoalname)
  .then(goal => {
    goal.task_achieved = 0;
    goal.streak = 0;
    if(goal.goal_type === "loseweightgoal"){
      goal.current_weight = "NA";
      goal.weight_to_lose = "NA";
    }
    for(i = 0; i < goal.tasks.length; i++){
      console.log(goal.tasks[i]);
      if(goal.tasks[i].achieved === true)
        goal.tasks[i].achieved = false;
    }
    console.log("After modifying, the goal is " + goal);
    return goal;
  })
  .then(goal => req.user.goals.push(goal))
  .then(() => req.user.save())
  .then(() => { res.send("success") })
  .catch(error => { console.log(error) });

})

// End of join goals code




router.post('/signup', function(req, res, next) {
	var username = req.body.username;
	var email = req.body.email;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var password = req.body.password;
	var reenterpassword = req.body.reenterpassword;

  //to find if username already in use
  User.findOne({username: username}, function (err, users) {
    if (err) {
      console.log('An error occurred');
    }
    if(users){
      res.send("usernametaken");
      return;
    }

    //to find if email already in use
    User.findOne({email: email}, function (err, users) {
      if (err) {
        console.log('An error occurred');
      }
      if(users){
        res.send("emailtaken");
        return;
      }
      User.register(new User({username: username, email: email, firstname: firstname, lastname: lastname, points: 0,points_to_levelup: 10, level: 1}), password, function(err) {
        if (err) {
          console.log('error while user register!', err);
          return next(err);
        }


        res.send("loggedin");
        console.log("loggedin was sent successfully")
      });
    });
  });

});


router.post('/login', passport.authenticate('local'), function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send("loggedin");
    return;
  });


router.get('/logout', function(req, res) {
  req.logout();
  res.send("loggedout");
  console.log("The user is logged out");
});


router.get('/getUser', function(req, res) {
  res.send(req.user);
});

router.get('/getUserlist', function(req, res) {
    var userlist;
    grabuserlist = function() {
      User.find(function(err, Users){
        if(err){
          console.log("An error happened here");
        }
        userlist = Users.map(function(d){ return d.toObject() });
        res.send(userlist);
      });
    }

    grabuserlist()
});



router.post('/creategoal', function(req, res, next) {
  creategoal = function(){

    var new_goal = new goal({
      goal_type :           req.body.goal_type,
      goal_name :           req.body.goal_name,
      current_weight :      req.body.current_weight,
      weight_to_lose :      req.body.weight_to_lose,
      streak :              0,
      task_achieved :       false,
    })

    return new Promise(function(resolve, reject){
      resolve(new_goal);
    });
  }


  creategoalinuser = function(){
    creategoal()
    .then(goal => {
      addtasktotasks = function(taskname, taskpoints) {
        if(taskname != ""){
          var new_task = new task({
            achieved:           false, 
            name:               taskname,
            points:             taskpoints,
          })
          goal.tasks.push(new_task);
        }
      }
      addtasktotasks(req.body.task1name, req.body.task1points);
      addtasktotasks(req.body.task2name, req.body.task2points);
      addtasktotasks(req.body.task3name, req.body.task3points);
      addtasktotasks(req.body.task4name, req.body.task4points);
      addtasktotasks(req.body.task5name, req.body.task5points);
      addtasktotasks(req.body.task6name, req.body.task6points);
      addtasktotasks(req.body.task7name, req.body.task7points);
      addtasktotasks(req.body.task8name, req.body.task8points);
      return goal;
    })
    //.then(goal => { goal.save(); return goal; })
    .then(goal => req.user.goals.push(goal))
    .then(() => req.user.save())
    .then(() => { res.send("success") })
    .catch(error => { console.log(error) });
  }
  creategoalinuser();
});




// Points it takes to level up for each level, current level: points to level up for next level

var levelUpPoints = {
  1:25,
  2:50,
  3:80,
  4:120,
  5:180,
  6:250,
  7:350,
  8:500,
  9:1000,
}


router.post('/addpointsfortask', function(req, res, next) {
  var goalstreak = 0;
  var goalname = req.body.goalname;
  var taskcompleted = req.body.taskcompleted;
  var pointsToAdd = Number(req.body.pointvalue);
  var levelup = false;
  addpoints = function() {
    console.log("We got in addpoints()");
    return new Promise(function(resolve, reject){
      resolve();
    });
  }

  addpoints()
  .then(() => { 
    //go through the goals to find which one had a task completed
    for(i = 0; i < req.user.goals.length; i++){
      //check if daily task has been completed
      if(req.user.goals[i].goal_name === goalname){
        if(!req.user.goals[i].task_achieved){
          req.user.goals[i].task_achieved = true;
          req.user.goals[i].streak = (Number(req.user.goals[i].streak) + 1);
          goalstreak = req.user.goals[i].streak;
          console.log("The goal streak is " + goalstreak);
        } else{
          goalstreak = req.user.goals[i].streak;
          console.log("The goal streak is " + goalstreak);
        }
        // Go through daily tasks
        for(x = 0; x < req.user.goals[i].tasks.length; x++){
          if(req.user.goals[i].tasks[x].name === taskcompleted) {
            if(!req.user.goals[i].tasks[x].achieved){
              req.user.points += pointsToAdd;
              req.user.goals[i].tasks[x].achieved = true;
            }
          }
        }

        //Check if user has leveled up or not
        for(var level in levelUpPoints){
          if(Number(level) === Number(req.user.level)){
            if(Number(req.user.points) > (Number(req.user.points_to_levelup) - 1)){
              req.user.level = (Number(req.user.level) + 1);
              req.user.points = (Number(req.user.points) - Number(req.user.points_to_levelup));
              req.user.points_to_levelup = levelUpPoints[level];
              levelup = true;
            }
          }
        }
      }
    }
    return req.user
  })
  .then(user => { user.save() })
  .then(goalstreaknow => { 
    console.log(goalstreak + " is the goal streak when the info object is made");
    var info = {
      points: req.user.points,
      pointsToLevel: req.user.points_to_levelup,
      level: req.user.level,
      streak: goalstreak,
      levelledup: levelup,
    };
    return info;
  })
  .then(info => { res.send(info) })
  .catch(err => { throw err });

});



// scheduled updates, which are not utilized in this project
//var CronJob = require('cron').CronJob;
  /*
   * Runs every weekday (Monday through Sunday)
   * at 12:00:00 AM
  */
/*
var job = new CronJob('00 27 00 * * *', function() {
  console.log("The CronJob has run!!!!!!");
  loseweightgoal.update({
    task_achieved : false
  }, {
    $set: {streak: 0}
  }, function(err, result) {
    if(err) {
      console.log("An error occured during the update");
    }
  })

  loseweightgoal.update({
    task_achieved : true
  }, {
    $set: {
    task_achieved:       false,
    walk_15_min:         false,
    exercise_30_min:     false,
    protein_breakfast:   false,
    no_sugar_drink:      false,
    high_fiber_food:     false,
    skip_dessert:        false,
    eat_vegetable:       false,
    eat_fruit:           false,
    hours_sleep_8:       false,
  }
  }, function(err, result) {
    if(err) {
      console.log("An error occured during the update");
    }
  })

  }, function () {
    // This function is executed when the job stops
    return;
  },
  false,
  'America/New_York' // Time zone of this job.
);
job.start();
*/






module.exports = router;












