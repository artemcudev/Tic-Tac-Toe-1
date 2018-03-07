"use strict";

function setSymbol(id, symbol){
	document.getElementById(id).firstElementChild.className = symbol;
}

var square = document.getElementsByClassName("square");
var winChains = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[1,4,7],
	[2,5,8],
	[3,6,9],
	[1,5,9],
	[3,5,7],
];
var minStepsToWin = 5;

var currentPlayer = 'o'
var currentPlayerHtml;
var gameOver = false;

var switchPlayer = function(){
	if(currentPlayer === 'o'){
		currentPlayer = 'x';
	}else{
		currentPlayer = 'o';
	}
}

var checkWinner = function(value){
	loop1:
	for (var i in winChains){
		if(winChains[i].indexOf(value) >= 0){
			var line = winChains[i];
			loop2:
			for(var j in line){
				if(document.getElementById(line[j]).firstElementChild.className !== currentPlayer){
					continue loop1;
				}
			}
			document.getElementById(value).classList.add('complete');
			for(var k in winChains[i]){
				document.getElementById(winChains[i][k]).classList.add('complete');
			}
			gameOver = true;
			document.getElementById('scoreboard').getElementsByTagName("h2")[0].innerHTML = 'Winner'
		}
	}

};
var startFrom = 1;

// check hash
var hash = '';
hash = location.hash ? location.hash.slice(1, location.hash.length) : '';
if(hash){
	var historyObj = hash.split(';'), params = '';
	for(var i in historyObj){
		params = historyObj[i].split(':');
		console.log(params);
		setSymbol(params[1], params[0]);
	}
	startFrom = historyObj.length + 1;
}

var stepCounter = (function(startFrom){
	var count = startFrom;
	return function(){
		return count++
	}
}(startFrom));

var gameStep = function() {
    var completed = this.getAttribute("completed");
	if(completed || gameOver){
		return false;
	}

	var step = stepCounter();

	this.setAttribute('completed', 1);

    this.firstElementChild.className = currentPlayer;

	var addHash = currentPlayer + ':' + this.dataset.value;

	if(step > 1){
		addHash = ';' + addHash;
	}

	location.hash += addHash;

	if(step >= minStepsToWin){
		checkWinner(parseInt(this.dataset.value));
	}

	if(! gameOver){
		switchPlayer();
		seTCurrentPlayer();
	}
};

for (var i = 0; i < square.length; i++) {
    square[i].addEventListener('click', gameStep, false);
}

var seTCurrentPlayer = function(){
	document.getElementById("currentstep").firstElementChild.className = currentPlayer;
}

seTCurrentPlayer();