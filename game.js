var buttoncolours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Starts game when keydown event happens
$(document).on("keydown", function() {
  if (!started) {
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
  }
});

// Function saves user clicked buttons, animates and plays appropriate sound
$('.btn').click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


// Function compares user actions with program actions
function checkAnswer(currentLevel) {
  console.log("userClickedPattern: " + userClickedPattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong!");
    playSound(currentLevel);

    $('body').addClass('game-over');

    setTimeout(function() {
      $('body').removeClass('game-over');
      }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

// Function will generate next colour button, animate and play sound
function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  $('#level-title').text("Level " + level);

  var randNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttoncolours[randNum];
  gamePattern.push(randomChosenColour);

  console.log("Game pattern: " + gamePattern);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

// Function will play appropriate sound for a clicked button
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

// Function animates clicked button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Function resets the variables to initial value
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
