'use strict';

var root;

$(document).ready(init);

function init(){
  // root = new Firebase('https://battleship-cdr.firebaseio.com/');
  // shipPlacement(5);
  setFleet();
}

function getStartingPos() {
  var startPosition = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10)
  };
  return startPosition;
}

function setFleet() {
  // var ships = [5,4,3,3,2];
  var ships = [5];
  for (var length = 0; length<ships.length ; length++) {
    // console.log('ships',ships[length]);
    shipPlacement(ships[length]);

  }
}


function possiblePlace(start, size, direction_x, direction_y) {
  // determine the endPos
  // var end = {
  //   x: start.x + ((size)*direction_x),
  //   y: start.y + ((size)*direction_y)
  // };

  // console.log(start.x, start.y, end.x, end.y, size);

  var end_x = start.x + ((size)*direction_x);
  var end_y = start.y + ((size)*direction_y);


  for (var x = start.x; x<end_x; x++) {
    var $td = $('#boardShips td[data-x="'+ x +'"][data-y="'+start.y+'"]');

    $td.addClass('p1_ship');
    console.log($td);
  }
}


function shipPlacement(shipSize) {
  // x and y labels
  var x_label = 0;
  var y_label = 1;
  // create array of possible placement directions from which to randomly select
  var directions = [[1,0],[-1,0],[0,1],[0,-1]];
  // get a starting point
  var startPos = getStartingPos();

  for (var i = 3; i>=0 ; i--) {
    var direction = Math.floor(Math.random()*i);
    var thisDirection = directions.splice(direction,1);
    var end_x = startPos.x + (shipSize * thisDirection[0][x_label]);
    var end_y = startPos.y + (shipSize * thisDirection[0][y_label]);
    // debugger;
    // if (thisDirection[])
    console.log('x,y',startPos.x, startPos.y);
    console.log('direction', thisDirection[0][0], thisDirection[0][1]);
    console.log('end x,y', end_x, end_y);
  }
    // var test = possiblePlace(startPos,shipSize,thisDirection[0],thisDirection[1]);
    // if (test[0]===true) {
    //
    // }
// 2.

  // console.log('start',startPos);
//   var starting_x;
//   var starting_y;
//   var direction_x;
//   var direction_y;
//   var startPositions = [];
//
//   // INITIALIZE
//   starting_x = Math.floor(Math.random() * 10);
//   starting_y = Math.floor(Math.random() * 10);
//
//
//   for (var i = 0; i<10; i++) {
//     getStartingPos();
//
//     startPositions.push(startPosition);
//     while (startPositions.length<5) {
//       var direction_x = ((Math.random()-0.5)>0) ? 1 : -1;
//       var direction_y = ((Math.random()-0.5)>0) ? 1 : -1;
//
//     //
//     //   for (var i = 0;  i<startPositions.length; i++) {}
//     //   // if (ob.x===ob1.x&&ob.y===ob1.y)
//     //   var startPosition = {
//     //     x: -1,
//     //     y: -1
//     //   };
//       console.log(startPositions[i].x, startPositions[i].y);
//     }
//   }
}
