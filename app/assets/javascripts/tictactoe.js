 const WIN_COMBINATIONS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [6,4,2]
]

var turn = 0;

var currentGameId = null;

function player(){
 return turn % 2  ?  'O' : 'X'; 	
}


function updateState(td){
	var currentPlayer = player();
	if (!$(td).text()){
			$(td).text(currentPlayer);
			turn++; 	
	}

}

function setMessage(string){
	$("#message").text(string);
}

function checkWinner(){

	var squareAgain =  $('td');
	var winner = "none";

	var board = {
	length: 0,
    addElem: function addElem(el) {
        [].push.call(this, el);
    	}
	};

	//push elements to board nodelist
	 for (var i = 0; i < squareAgain.length; i++) {
	  board.addElem(squareAgain[i].innerHTML);
	}

	//check board for combinations of X or Y
	for (let i = 0; i < WIN_COMBINATIONS.length; i++) {
    const [a, b, c] = WIN_COMBINATIONS[i];

    	if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] !=="") {
     	 winner = board[a];
		  if (winner === "O"){
		 	setMessage('Player O Won!');
   		 } else if (winner === "X"){ 
		  setMessage('Player X Won!');
		 } 

		 return true;
	 } 
   } return false;

}


function doTurn(square){
  
  updateState(square);	
  
  var x = checkWinner();

	if (x === true) { 
	saveGame();
	clearGame();

	} else if (turn === 9) {  
	
	setMessage("Tie game.");
	saveGame();
	clearGame();
	
	}

	
}

function clearGame(){
  $('td').empty();
  turn = 0;
  currentGameId = null;
}

// function saveGame(){


// var squareAgain =  $('td');

// //exercise to get boardstate again

// var currentBoard = {
// 	length: 0,
//     addElem: function addElem(el) {
//         [].push.call(this, el);
//     	}
// 	};

// 	 for (var i = 0; i < squareAgain.length; i++) {
// 	  currentBoard.addElem(squareAgain[i].innerHTML);
// 	}


// }


function previousGame() {
  $.get('/games', function(response) {
    $('#games').html(response);
    var allGames = "";
    for (var i=0; i < response.data.length; i++) {
      var game = response.data[i];
      allGames += `<button onclick="loadGame(${game.id})">${game.id}</button>`;
    }
    $("#games").html(allGames);
  });
}


function saveGame() {
  var state = [];

  $('td').text((index, square) => {
    state.push(square);
    return square;
  });

  var method = currentGameId ? 'PATCH' : 'POST';
  var url = currentGameId ? `/games/${currentGameId}` : '/games';

  $.ajax({
    type: method,
    data: {state: state},
    url: url,
    success: function(response) {
      currentGameId = response.data.id;
    }
  });
}



function loadGame(id) {
  $.get(`/games/${id}`, function(response) {
    var game = response.data;
    $('td').text((index, square) => game.attributes.state[index]);
    currentGameId = game.id;
    var tokens = game.attributes.state.filter(function(spot) {
      return spot != "";
    })
    turn = tokens.length;
  });
}



function attachListeners() {


  $('td').on("click", function() {
      doTurn(this); 
  });

  $('#previous').on("click", function(){
  	previousGame();
  });

  $('#clear').on("click", function(){
  	clearGame();
  });

  $('#save').on("click", function(){
  	saveGame();
  });


}




$(document).ready(function(){
	attachListeners();
	
})

