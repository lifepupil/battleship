'use strict';

var root;

$(document).ready(init);

function init(){
  root = new Firebase('https://battleship-cdr.firebaseio.com/');
  // shipPlacement(5);
  setFleet();
  getStartingPos();
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
  for (var length = 0; length<5 ; length++) {
    // console.log('ships',ships[length]);
    shipPlacement(ships[length]);

  }
}


function possiblePlace(start, size, direction_x, direction_y) {
  // 1. determine the endPos
  var end = {
    x: start.x + ((size)*direction_x),
    y: start.y + ((size)*direction_y)
  };

  console.log(start.x, start.y, end.x, end.y, size);
  // 2. if (startPos.x === endPosx) { loop through each y in between to see if occupied by another ship} else {loop through x}


}


function shipPlacement(shipSize) {

// 1. get a starting point
  var startPos = getStartingPos();
  possiblePlace(startPos,shipSize,1,1);
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
