END = 1;
PLAY = 0;
WIN = 1;
var gameState = PLAY;
var deaths = 0;
var b1, bImage;
var monkey, monkey_walking, monkey_stopped;
var banana, bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var b = 0;
var rockdestroyed;
var road;
var survivalTime;
var monkeyKing;
function preload() {


  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png")

  monkey_stopped = loadAnimation("Monkey_01.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

  bImage = loadImage("jungle.jpg")

  FoodGroup = new Group();
  obstacleGroup = new Group();
}



function setup() {
  createCanvas(600, 600)
   b1 = createSprite(300, 300)
  b1.addImage(bImage)
  b1.velocityX=-5- score / 10;
  b1.scale=1.5;
  monkey = createSprite(50, 500)
  monkey.addAnimation("walking", monkey_running)
  monkey.addAnimation("stopped", monkey_stopped)
  monkey.scale = 0.10;
 
  camera.y=monkey.y;
 camera.x=monkey.x
 camera.zoom=0.6
  road = createSprite(10, 530, 1200, 10)
  road.visible=false;

}


function draw() {
  background("white")


  if (b1.x < 0) {
    b1.x = b1.x=120;
  }
  monkey.collide(road);

  if (gameState === PLAY) {
    if (keyDown("space") || mousePressedOver(monkey) || keyDown("enter")) {
      monkey.velocityY = -12;

    }
    monkey.velocityY = monkey.velocityY + 1;
    survivalTime = Math.ceil(frameCount / frameRate())

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 5;
      b = b + 1;
      switch(score){
      case 5:monkey.scale=0.12;
      break;
      case 10:monkey.scale=0.14;
      break;   
      case 15:monkey.scale=0.16;
      break;   
      case 20:monkey.scale=0.18;
      break;   
      case 25:monkey.scale=0.20;
      break;  
      case 30:monkey.scale=0.22;
      break;   
      case 40:monkey.scale=0.25;
      break;   
      case 50:monkey.scale=0.30;
          banana.scale=0.15;
      break;   
      case 100:monkey.scale=0.35;
        banana.scale=0.20;  
      break;   
      case 200:monkey.scale=0.45;
      break;   
      case 350:monkey.scale=0.55;
          banana.scale=0.30;
      break;   
      case 500:monkey.scale=1;
      break;   
       
      
      
    }
    }
    if (obstacleGroup.isTouching(monkey)) {
      obstacleGroup.destroyEach();
      deaths = deaths + 1;
      monkey.scale=0.10;
    
    }
    
     if (deaths === 20) {
      gameState = END;
    }else if(monkey.scale===1){
      gameState=WIN;
    }
  } else if (gameState === END) {
    obstacleGroup.setVelocityEach(0, 0)
    FoodGroup.setVelocityEach(0, 0)
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.changeAnimation("stopped", monkey_stopped)
    

    b = 0;
    score = 0;
    survivalTime = 0;
  }
  if(gameState===WIN){
    obstacleGroup.setVelocityEach(0, 0)
    FoodGroup.setVelocityEach(0, 0)
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.x=300;
    monkey.y=500;
    
  }




  obstacles();
  food();
  //console.log(bananataken)
  drawSprites();
  fill("black")
  textSize(25)
  text("Score: " + score, 30,50)

if(gameState===WIN){
  fill("red")
  text("You Helped the Monkey",200,300)
    text("He is now the king of this jungle Because ",100,200)
    text("of you",300,250)
  b1.setVelocity(0,0)
}
if(gameState===PLAY){
  fill("red")
  textSize(20)
  text("Survival Time: " + survivalTime, 200, 50)

  fill("yellow")
  text("Banana Taken =  " + b, 300, 100)

  fill("pink")
  text("No. of Times hit  by a rock : " + deaths, 200, 200)
}
}
function food() {

  if (frameCount % 100 === 0) {

    banana = createSprite(600, Math.round(random(120, 300)))
    banana.addImage(bananaImage)
    banana.scale = 0.05;
    banana.velocityX = -6 - score / 10;
    banana.lifetime = 300;
    FoodGroup.add(banana)
  }
}

function obstacles() {
  if (frameCount % 200 == 0) {
    obstacle = createSprite(Math.round(random(200, 600)), 490)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.20;
    obstacle.velocityX = -4 - score / 10;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }

}
