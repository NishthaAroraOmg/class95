//declaring the variables
var ball,playerPaddle,computerPaddle; 
var gameState = "serve";     
var playerScore=0;
var compScore=0;
var sound1;
var ballImg,boy,robot;

function preload(){
 sound1=loadSound("collided.wav");
 ballImg=loadImage("ball.jpg");
 boy=loadImage("boy.jpg");
 robot=loadImage("robot.jpg");  
}

function setup(){
 createCanvas(400,400)
 ball = createSprite(200,200,10,10);
 playerPaddle = createSprite(360,200,10,70);
 computerPaddle = createSprite(30,200,10,70); 
  ball.addImage("ball",ballImg);
  playerPaddle.addImage("boy",boy);
  computerPaddle.addImage("robot",robot);
 
  playerPaddle.scale=0.2;
  computerPaddle.scale=0.4;
  ball.scale=0.09;


}

function draw() {
  //clear the screen
  background("white"); 
  
  if(ball.isTouching(computerPaddle) || ball.isTouching(playerPaddle)) {
    sound1.play();
  }
  
  //place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   
  //display scores
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position 
  computerPaddle.y = ball.y;
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  edges=createEdgeSprites();
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      compScore = compScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 5;
  ball.velocityY = 15;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
