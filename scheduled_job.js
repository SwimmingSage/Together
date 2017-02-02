

var mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/data');

if(mongoose.connection.readyState != 1)
	mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');

//var User = require('./schemas/user.js');
//var loseweightgoal = require('./schemas/user.js');
require('./schemas/user.js');

console.log("The scheduled job ran");
console.log("The scheduled job ran");
console.log("The scheduled job ran");
console.log("The scheduled job ran");
console.log("The scheduled job ran");

var User = mongoose.model('User');

// if task is not achieved - streak is zero
// set all tasks achieved to false

updateallgoals = function(){
  var userlisttoupdate;
  grabuserlist = function() {
    return new Promise(function(resolve, reject){
        User.find(function(err, Users){
        if(err){
          console.log("An error happened here");
        }

        userlisttoupdate = Users.map(function(d){ return d });
        resolve(userlisttoupdate);
      });
    })
  }

  grabuserlist()
  .then(userlisttoupdate => {
    for(a = 0; a < userlisttoupdate.length; a++){
      userlisttoupdate[a].goals_to_delete = 3;
      for(b = 0; b < userlisttoupdate[a].goals.length; b++){

        if(userlisttoupdate[a].goals[b].task_achieved){
          userlisttoupdate[a].goals[b].task_achieved = false;
          userlisttoupdate[a].save();
        } else {
          userlisttoupdate[a].goals[b].streak = 0;
          userlisttoupdate[a].save();
        }
        for(c = 0; c < userlisttoupdate[a].goals[b].tasks.length; c++){
          if(userlisttoupdate[a].goals[b].tasks[c].achieved){
            userlisttoupdate[a].goals[b].tasks[c].achieved = false;
            userlisttoupdate[a].save();
          }
        }
      }
    }
  })
}

updateallgoals();

