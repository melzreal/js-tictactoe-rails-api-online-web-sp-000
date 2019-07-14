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

WIN_COMBINATIONS.forEach(function(check){

		
});

 // setMessage('Player X Won!');

 // setMessage('Player Y Won!');



}

function position_taken(index){
var square = window.document.querySelectorAll('td');

   if (square[index]=== "X" || square[index] === "O"){
   	return true; 
   } else {
   	return false;

   	} 
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

