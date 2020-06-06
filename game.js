var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level " +  level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
  animatePress(randomChosenColor);

}

$(".btn").click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length)
});

function playsound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

$(document).on("keypress", function(){
  $("h1").text("Level 0");
  if(level===0){
    nextSequence();
  }
})

function checkAnswer(currentLevel){
  var r=0;
  for(var i=0;i<currentLevel;i++){
    if(userClickedPattern[i]!==gamePattern[i]){
      r = 1;
      break;
    }
  }
  if(r==1){
    console.log("wrong")
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    level=0;
    gamePattern=[];
  }
  else if(level==currentLevel){
    console.log("success");
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
