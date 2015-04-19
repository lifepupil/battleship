'use strict';

var root, characters, myKey, myCharacter;

$(document).ready(init);

function init(){
  root = new Firebase('https://battleship-cdr.firebaseio.com/');
  //
  $('#create-user').click(createUser);
  $('#login-user').click(loginUser);
  $('#logout-user').click(logoutUser);
  // $('#start-user').click(startUser);

  setFleet();
}

function logoutUser(){
  root.unauth();
  myKey = null;
  $('#characters > tbody > tr.active').removeClass('active');
}

function loginUser(){
  var email = $('#email').val();
  var password = $('#password').val();

  root.authWithPassword({
    email    : email,
    password : password
  }, function(error){
    if(error){
      console.log('Error logging in:', error);
    }else{
      redrawCharacters();
    }
  });
}

function createUser(){
  var email = $('#email').val();
  var password = $('#password').val();

  root.createUser({
    email    : email,
    password : password
  }, function(error){
    if(error){
      console.log('Error creating user:', error);
    }
  });
}

function getStartingPos() {
  var startPosition = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  };
  return startPosition;
}

function setFleet() {
  var ships = [5,4,3,3,2];
  // var ships = [5,4];
  for (var length = 0; length<ships.length ; length++) {
    // console.log('ships',ships[length]);
    shipPlacement(ships[length]);
  }
  // console.log($('.ship').length);
}

function possiblePlace(start, end) {
  if (start.y === end.y) {
    if (start.x<end.x) {
      for (var x = start.x; x<end.x; x++) {
        var $td = $('#boardShips td[data-x="'+ x +'"][data-y="'+start.y+'"]');
        if ($td.hasClass('ship')) {
          return false;
        }
      }
      return true;
    } else {
      for (var x = end.x; x<start.x; x++) {
        var $td = $('#boardShips td[data-x="'+ x +'"][data-y="'+start.y+'"]');
        if ($td.hasClass('ship')) {
          return false;
        }
      }
      return true;
    }
  // IF start.y is not equal to end.y then do this
  } else {
    if (start.y<end.y) {
      for (var y = start.y; y<end.y; y++) {
        var $td = $('#boardShips td[data-x="'+ start.x +'"][data-y="'+ y +'"]');
        if ($td.hasClass('ship')) {
          return false;
        }
      }
      return true;
    } else {
      for (var y = end.y; y<start.y; y++) {
        var $td = $('#boardShips td[data-x="'+ start.x +'"][data-y="'+ y +'"]');
        if ($td.hasClass('ship')) {
          return false;
        }
      }
      return true;
    }
  }
}

function setPlace(start, end) {
  if (start.y === end.y) {
    if (start.x<end.x) {
      for (var x = start.x; x<end.x; x++) {
        var $td = $('#boardShips td[data-x="'+ x +'"][data-y="'+start.y+'"]');
        $td.addClass('ship');
      }
    } else {
      for (var x = end.x; x<start.x; x++) {
        var $td = $('#boardShips td[data-x="'+ x +'"][data-y="'+start.y+'"]');
        $td.addClass('ship');
      }
    }
  // IF start.y is not equal to end.y then do this
  } else {
    if (start.y<end.y) {
      for (var y = start.y; y<end.y; y++) {
        var $td = $('#boardShips td[data-x="'+ start.x +'"][data-y="'+ y +'"]');
        $td.addClass('ship');
      }
    } else {
      for (var y = end.y; y<start.y; y++) {
        var $td = $('#boardShips td[data-x="'+ start.x +'"][data-y="'+ y +'"]');
        $td.addClass('ship');
      }
    }
  }
}

function shipPlacement(shipSize) {
  // x and y labels
  var x_label = 0;
  var y_label = 1;
  var done = false;
  // create array of possible placement directions from which to randomly select
  var directions = [[1,0],[-1,0],[0,1],[0,-1]];
  // get a starting point
  var startPos = getStartingPos();
  // look for possible placements
  for (var i = 3; i>=0 ; i--) {
    var direction = Math.floor(Math.random()*i);
    var thisDirection = directions.splice(direction,1);
    var end_x = startPos.x + (shipSize * thisDirection[0][x_label]);
    var end_y = startPos.y + (shipSize * thisDirection[0][y_label]);

    var endPos = {
      x: end_x,
      y: end_y
    };

    if (end_x<10 && end_x>=0 && end_y<10 && end_y>=0 && possiblePlace(startPos, endPos)) {
        done = true;
        setPlace(startPos, endPos);
        break;
    }
  }
  if (!done) {
    console.log(startPos);
    shipPlacement(shipSize);
  }
}
