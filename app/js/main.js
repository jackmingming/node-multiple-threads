"use strict";

function makeAjaxCall(url, method, data) {
  return new Promise(function(res, rej) {
    var req = new XMLHttpRequest();

    req.open(method, url, true);
    if (method === 'POST') {
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          res(req.response);
        } else {
          rej(Error(req.statusText));
        }
      }
    };

    req.onerror = function() {
      rej(Error("Please check your connection!"));
    }
    req.send(JSON.stringify(data));
  })
}
var limitation = 50;

makeAjaxCall('api/search/' + limitation, 'GET').then(function(res) {
  //var resJSON = JSON.parse(res);
  //console.log('res: ', resJSON.results);
  //console.log('lodash: ', _.chunk(resJSON.results, 2));
}, function(err) {
  //console.log('err: ', err);
});
makeAjaxCall('/api/postTest', 'POST', { test: 'test' }).then(function(res) {
  //console.log('res: ', res);
}, function(err) {
  //console.log('err: ', err);
});

(function() {
  $.getJSON("tmp/input.json", function(data) {
    if (data) {
      var rows = data.rows; //6
      var cols = data.cols; //7
      var moves = data.moves;
      var playerAMoves = [
        [0, 0],
        [1, 0]
      ];
      var playerBMoves = [
        [0, 1],
        [1, 1]
      ];
      var pieceA;
      var pieceB;
      var playground = buildPlaygound(data.rows, data.cols);
      var updatedPlayground = updatePlayground(playground, playerAMoves, playerBMoves);
    }
  });

  function buildPlaygound(rows, cols) {
    var star = '*';
    var groundOuter = [];
    var groundInner = [];

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        groundInner[c] = star;
      }
      groundOuter.push(groundInner);
    }

    return groundOuter;
  }

  function updatePlayground(playground, playerA, playerB) {

    if ((playerA.length > 0 && playerB.length > 0)) {
      for (var i = 0; i < playerA.length; i++) {
        var x = playerA[i][0];
        var y = playerA[i][1];

        playground[x][y] = 'x';
        //checkConnectFour()
      }

      for (var r = 0; r < playerB.length; r++) {
        var x = playerB[r][0];
        var y = playerB[r][1];

        playground[x][y] = 'o';
        //checkConnectFour()
      }
    }
    console.log(playground);
    return playground;
  }

  function checkConnectFour(symbol, positionX, positionY, playground) {
    var x = positionX;
    var y = positionY;
    var positionInGround = playground[x][y];
    var southRows = playground.length - x;
    var count = 0;

    // check east and west
    for (var i = 0; i < playground[x].length; i++) {
      if (playground[x][i] === symbol) {
        count++
        if (count === 4) {
          return symbol + 'win';
        }
      }
    }
    // check North-South
    for (var s = 0; s < playground.length; s++) {

    }
  }
})();