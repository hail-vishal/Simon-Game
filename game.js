
var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

function playSound(name) {

  var colorAudio = new Audio("sounds/" + name + ".mp3");
  colorAudio.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  level += 1;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  gamePattern.push(randomChosenColour);

}

function checkAnswer(currentLevel, lastIndex) {
  if(userClickedPattern[lastIndex] === gamePattern[lastIndex]){
    console.log("success");
  }
  else{
    gameOver();

  }

  if(currentLevel === (lastIndex + 1)){
    userClickedPattern = [];
    setTimeout(nextSequence, 1000);
  }
}

function gameOver() {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout( function () {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);

  var lastIndex = userClickedPattern.length - 1;
  checkAnswer(level, lastIndex);

})

$(document).keypress( function() {

  if(!started){
    started = true;
    nextSequence();
  }
})
