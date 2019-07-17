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

function player(){
 return turn % 2  ?  'O' : 'X'; 	
}


function updateState(td){
	var currentPlayer = player();
	$(td).text(currentPlayer);

	// $('table tr td').on("click", function() {
	// 	currentPlayer = player();
	// 	$(this).text(currentPlayer);
	// 	turn++;
	// });
	
}

function setMessage(string){
	$("#message").text(string);
}

function checkWinner(){

	var squareAgain = window.document.querySelectorAll('td')
	var winner = "none";
	var board = {
	length: 0,
    addElem: function addElem(el) {
        [].push.call(this, el);
    	}
	};

 for (var i = 0; i < squareAgain.length; i++) {
  board.addElem(squareAgain[i].innerHTML);
}

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
	// 	console.log(winner);
 //        return true;
	//  } else {
 //  	setMessage('Its a draw!'); 	
 //  	return false;

	 	} 
   } return false;

}


function doTurn(){
	turn++;
}

function clear(){

var square = window.document.querySelectorAll('td');

 $("#clear").on("click", function() {	
 for (let i = 0; i < 9; i++) {
    $(square[i]).text('');
  } 
 });


}

$(document).ready(function(){
	updateState();
	clear();
})

