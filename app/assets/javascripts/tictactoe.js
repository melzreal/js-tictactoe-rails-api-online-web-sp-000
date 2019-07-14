const WINNING_COMBOS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],
                        [1,4,7], [2,5,8], [0,4,8], [2,4,6]];


var turn = 0;

function player(){
 return turn % 2  ?  'O' : 'X'; 	
}


function updateState(td){
	// var currentPlayer = player();
	// $(td).text(currentPlayer);

	$('table tr td').on("click", function() {
		currentPlayer = player();
		$(this).text(currentPlayer);
		turn++;
	});
	
}

function setMessage(string){

	$("#message").text(string);

}

function checkWinner(){


}

function doTurn(){
	turn++;
}

function clear(){
 $("#clear").on("click", function() {	

 const square = window.document.querySelectorAll('td');

 for (let i = 0; i < 9; i++) {
    $(square[i]).text('');
  }

  });
}

$(document).ready(function(){
	updateState();
	clear();
})

