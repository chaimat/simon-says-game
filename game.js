// DEFINING VARIABLES
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = false;

//CALL FUNCTION nextSequence ON ANY KEYPRESS ONLY ONCE
$(document).keypress(function(){
  if(gameStarted === false){
    nextSequence();
    gameStarted = true;
  }
});

// SEQUENCE DECIDER FUNCTION
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  $("h1").text("Level " + level);
  // console.log(randomNumber + " " + randomChosenColor + " " + gamePattern);
  playSound(randomChosenColor);
  level++;
}

// BUTTON CLICK IDENTIFIER FUNCTION
$("div.btn").click(function handler() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  // console.log(level);
  // console.log(userClickedPattern);
})

// SOUND PLAYER FUNCTION
function playSound(name){
  new Audio("sounds/" + name + ".mp3").play();
}

//ANIMATED PRESSING FUNCTION
function animatePress(currentColor){
  $("div#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("div#" + currentColor).removeClass("pressed");
  }, 100)
}

// ANSWER CHECKER
function checkAnswer(currentLevel){
  // console.log(userClickedPattern + "..." + userClickedPattern[currentLevel] + "\n" + gamePattern + "..." + gamePattern[currentLevel] + "\n" + currentLevel + "\n" + level);
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(currentLevel === level-1){
      userClickedPattern = [];
      setTimeout(nextSequence,1000);
    }
  }else{
    if(gameStarted == true){
      new Audio("sounds/wrong.mp3").play();
      $("h1").text("Game Lost! Press Any Key to Restart Game");
      gamePattern = [];
      level = 0;
      gameStarted = false;
    }
  }
}
