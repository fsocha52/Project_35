var backgroundImg;
var Balloon;
var balloonImg1, balloonImg2, balloonImg3;
var position;
var database;

function preload() {
  
  backgroundImg = loadImage("images/background.png");
  balloonImg1 = loadImage("images/Balloon1.png");
  balloonImg2 = loadImage("images/Balloon2.png");
  balloonImg3 = loadImage("images/Balloon3.png");
  
}

function setup() {
  database = firebase.database();
  createCanvas(1920,1080)
  Balloon = createSprite(650, 600);
  Balloon.addImage(balloonImg1);
  
}

function draw() {
  background(backgroundImg);
  
  var balloonRef = database.ref("Balloon");
  balloonRef.on("value", function(data) {
    
    position = data.val();
    Balloon.x = position.x;
    Balloon.y = position.y;
    
  });
  
  if(keyDown(LEFT_ARROW)) {
    
    updateBalloon(-10, 0);
    
  }
  
  if(keyDown(RIGHT_ARROW)) {
    
    updateBalloon(10, 0);
    
  }
  
  if(keyDown(UP_ARROW)) {
    
    updateBalloon(0, -10);
    Balloon.scale -= 0.03;
    Balloon.addImage(balloonImg2);
    
  }
  
  if(keyDown(DOWN_ARROW)) {
    
    updateBalloon(0, 10);
    Balloon.scale += 0.03;
    Balloon.addImage(balloonImg3);
    
  }
  
  drawSprites();
  
}

function updateBalloon(x, y) {
  
  database.ref("Balloon").set({
    
    x: position.x + x,
    y: position.y + y
    
  });
  
}
