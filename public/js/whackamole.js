'use strict'

var bowlsLoaded = 0;
var level = 1;
var time = 10;
var timer;
var moleInterval;
var gameInterval = 1400;
var gameOver = true;
var pipesLeft = 3;
var moleHit = false;
var highScore = 0;

//start game 
$('.sbutton').click(function(){
	startGame();
});	

//timer functions when you click start game button
function startGame () {
	if (gameOver) {
		moleMove();
		gameOver = false;
		timer = setInterval(decrementTime, 1000);
	};
}			

//get random mole to pop up in box
function getNewHole(){
	var boxes = $('.boxes'); //grabs all of the boxes
	var randomNumber = Math.floor(Math.random() * 9); 
	var boxToAnimate = boxes[randomNumber]; 
	var id = boxToAnimate.getAttribute('id');
	animateMole(id);
	console.log(id);
}

//flower pops up and disappears
function animateMole(id){
	$('#' + id).addClass('active');
	setTimeout(function(){
		console.log(id);
		$('#' + id).removeClass('active');
		if(!moleHit) {
			livesLeft();
		}
		moleHit = false; 
	}, (gameInterval - 50));
}

//flower pops up and game speeds up for next level
function moleMove(){
	moleInterval = setInterval(moleMoving, gameInterval); 
}


function moleMoving () {
	getNewHole();
}

//click on active flower and increments score
$('.boxes').click(function(){
	var box = $(this);
	if(box.hasClass('active')) {
		document.getElementById('bubbles').play();	
		box.removeClass('active');
		incrementScore();
		moleHit = true;
	}
})

// created score, adjust by one each time click event happens
// score is by # of bowls loaded in 30 second round
function incrementScore(){
	bowlsLoaded += 1;
	$('#score').html(bowlsLoaded);
}

//time countdown and end of round 
function decrementTime(){
	time -= 1;
	$('#timer').text(time);
	if (time == 0) {
		endGame();
		console.log(time);
		clearInterval(timer);
		clearInterval(moleInterval);
		document.getElementById('cough').play();
		incrementLevel();
		resetTime();
	}

}

//increases speed of game each level
function incrementLevel(){
	level += 1; 
	$('#level').html(level);
	gameInterval -= 150;
}

//reset time function
function resetTime() {
	 time = 10; 
	 return time; 
}

//End of game, resets time, score, and level
function livesLeft(){
	if (pipesLeft <= 0){
		endGame();
		if (gameOver) {
			var x = confirm("You got too high and broke all your pipes! Smoke again?");
			if (x) {
				pipesLeft = 4;
				time = 10;
				clearInterval(moleInterval);
				clearInterval(timer);
				setTimeout(startGame, 1500);
			} else {
				location.reload(true);
			}
		}
	}

	pipesLeft -= 1; 
	$('#livesLeft').html(pipesLeft);
}

function endGame(){
	gameOver = true; 
}

// function when I call when I have no pipes left- reset level, pipes, etc. 
// function resetGame(){
// 	livesLeft(){
		
// 	}

// }

// high score
// variable set equal to 0
// if score is higher than high score need to replace set high score = to score
//Highest You've Gotten- create high score. 


// in game logic, set conditions to lose lives if they don't click on flower in time


// difficulty- increase speed- green, greener, greenest

	// clearInterval(getNewHole) this stops the game

	// function endGame(){

	// }	

