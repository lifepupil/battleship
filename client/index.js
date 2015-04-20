'use strict';

var root, players, myKey, otherKey, myPlayer, shipCoords;

$(document).ready(init);

function init(){
  root = new Firebase('https://battleship-cdr.firebaseio.com/');
  players = root.child('players');
  shipCoords = root.child('shipCoords');

  $('#create-user').click(createUser);
  $('#login-user').click(loginUser);
  $('#logout-user').click(logoutUser);
  $('#createShips').click(createFleet);
  $('#setShips').click(setFleet);

  $('#startGame').hide();
  $('#startGame').click(startGame);

  $('#create-player').click(createPlayer);
  players.on('child_added', playerAdded);
  players.on('value', areEnoughPlayers);
  shipCoords.on('child_added', getFleet);
}

function getFleet(snapshot) {
  var coord = snapshot.val();
  console.log(coord.player, otherKey);
  if (coord.player !== myKey) {
    var $td = $('#boardAttacks td[data-x="'+ coord.x +'"][data-y="'+coord.y+'"]');
    $td.addClass('enemyShip');
  }
}

function startGame(){

}

function areEnoughPlayers(snapshot) {
  var playerCount = snapshot.val();
  var playerArr = [];
  for (var playerKey in playerCount) {
    playerArr.push(playerKey);
  }
  if (playerArr.length === 2) {
    if (myKey !== playerArr[0]) {
      otherKey = playerArr[0];
    }
    // UNHIDE THE START BUTTON WHEN THERE ARE TWO PLAYERS
    $('#startGame').show();
  }
}

function setFleet() {
  // var shipCoords = root.child(myKey);

  var $shipPositions = $('.ship');
  for (var i = 0 ; i<$shipPositions.length ; i++) {
    var coord_x = $($shipPositions[i]).data('x');
    var coord_y = $($shipPositions[i]).data('y');

    shipCoords.push({
      player: myKey,
      x: coord_x,
      y: coord_y
    });
    // shipCoords.push(shipPositions[i]);
  }
  $('#setShips').hide();
  $('#createShips').hide();

// PUT SHIP COORDINATES UP ON FIREBASE
// SELECT WHICH PLAYER GOES FIRST
}


// THESE FUNCTIONS HANDLE USERS
function logoutUser() {
  root.unauth();
  myKey = null;
  // $('#characters > tbody > tr.active').removeClass('active');
}

function createPlayer(){
  var handle = $('#handle').val();
  var uid = root.getAuth().uid;
  players.push({
    handle: handle,
    uid: uid
  });
  $('#handle').val(handle);
}

function playerAdded(snapshot){
  var player = snapshot.val();
  var myUid = root.getAuth() ? root.getAuth().uid : '';
  var active = '';

  if(myUid === player.uid) {
    myKey = snapshot.key();
    myPlayer = player;
    active = 'active';
  }
  // console.log('PLAYER ADDED');
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
    }
  });
  $('#email').val(email);
  $('#password').val('');
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


// THESE FUNCTIONS PUT THE SHIPS ON THE BOARD
function getStartingPos() {
  var startPosition = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  };
  return startPosition;
}

function createFleet() {
  $('.ship').removeClass('ship');
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
    // console.log(startPos);
    shipPlacement(shipSize);
  }
}
