$(document).ready(function() {



  // Code for making input fields blur in and out
  $("#inputusername").blur(function() {
    $(this).css({"background-color":"#f7f6f6","box-shadow":"none"});
  });
  $("#inputusername").focus(function() {
    $(this).css({"background-color":"white","box-shadow":"2px 2px 4px #ffa834"});
  });

  $("#inputemail").blur(function() {
    $(this).css({"background-color":"#f7f6f6","box-shadow":"none"});
  });
  $("#inputemail").focus(function() {
    $(this).css({"background-color":"white","box-shadow":"2px 2px 4px #ffa834"});
  });

  $("#inputfirstname").blur(function() {
    $(this).css({"background-color":"#f7f6f6","box-shadow":"none"});
  });
  $("#inputfirstname").focus(function() {
    $(this).css({"background-color":"white","box-shadow":"2px 2px 4px #ffa834"});
  });

  $("#inputlastname").blur(function() {
    $(this).css({"background-color":"#f7f6f6","box-shadow":"none"});
  });
  $("#inputlastname").focus(function() {
    $(this).css({"background-color":"white","box-shadow":"2px 2px 4px #ffa834"});
  });

  $("#inputpassword").blur(function() {
    $(this).css({"background-color":"#f7f6f6","box-shadow":"none"});
  });
  $("#inputpassword").focus(function() {
    $(this).css({"background-color":"white","box-shadow":"2px 2px 4px #ffa834"});
  });


  $("#inputre-enterpassword").blur(function() {
    $(this).css({"background-color":"#f7f6f6","box-shadow":"none"});
  });
  $("#inputre-enterpassword").focus(function() {
    $(this).css({"background-color":"white","box-shadow":"2px 2px 4px #ffa834"});
  });


  $('#signupstart').click( function(){
    $("#notmatchingpassword").hide();
    $("#usernamenotunique").hide();
    $("#emailinuse").hide();
    $("#invalidusernamepassword").hide();
    $("#fillallsections1").hide();
    $("#fillallsections2").hide();
    $("#invalidemail").hide();
    $('#badsymbols').hide();
    $('#goalstartwithletter').hide();

    $('#loginform').css({"display":"none", "opacity": "0"});
    $('#signupform').css({'display':'block'});
    $('#signupform').animate({'opacity':'0.97'}, 'slow');
  });

  $('#loginstart').click( function(){
    $("#notmatchingpassword").hide();
    $("#usernamenotunique").hide();
    $("#emailinuse").hide();
    $("#invalidusernamepassword").hide();
    $("#fillallsections1").hide();
    $("#fillallsections2").hide();
    $("#invalidemail").hide();
    $('#badsymbols').hide();
    $('#goalstartwithletter').hide();
    
    $('#signupform').css({"display":"none", "opacity": "0"});
    $('#loginform').css({'display':'block'});
    $('#loginform').animate({'opacity':'0.97'}, 'slow');
  });


});
