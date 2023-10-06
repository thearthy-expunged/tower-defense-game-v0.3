var archerAni, florestaimg, boardimg, arrowimg,archerimg,money_coinimg,money_makerAni,money_makerimg,enemyAni;
var archer, floresta, arrow,money_coin,invsprite1,invsprite2,money_maker,money_coinm,enemy1;
var archers = [],
  arrows = [],
  money_makers = [];
var coins
var enemys1
var enemy1h={Sprite:"",vida:10}
var charge1=0
var charge2=0  
var basic_equiex
var basic_equidef
var shootingSpeed = 100;
  var money = 50;
  function preload() {
  archerAni = loadAnimation(
    "archer0.png",
    "archer1.png",
    "archer2.png",
    "archer3.png"
  );
  money_makerAni = loadAnimation(
    "money_maker00.png",
    "money_maker01.png",
    "money_maker02.png",
    "money_maker03.png"
  );
  enemyAni = loadAnimation(
    "enemy00.png",
    "enemy01.png"
  )
  florestaimg = loadImage("floresta.png");
  boardimg = loadImage("board.png");
  arrowimg = loadImage("arrow-1.png");
  money_coinimg = loadImage("money_coin.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  floresta = createSprite(width / 2, height / 20 - height / 6, width, height);
  floresta.addImage(florestaimg);
  floresta.scale = 3;
  
  archer = createSprite(width / 5, height / 5);
  archer.addAnimation("archerANI", archerAni);
  archer.scale = 2;
  archers.push(archer)
  
  money_maker = createSprite(width / 4, height / 5);
  money_maker.addAnimation("money_makerANI", money_makerAni);
  money_maker.scale = 2;
  money_makers.push(money_maker)
  
  archerimg = createImg("archer0.png")
  archerimg.size(20,50)
  archerimg.position(width/2.6,height/2.5)
  archerimg.mouseClicked(place1)
  
  money_makerimg = createImg("money_maker00.png")
  money_makerimg.size(20,50)
  money_makerimg.position(width/3,height/2.5)
  money_makerimg.mouseClicked(place2)

  invsprite1 = createSprite(mouseX,mouseY,250,250)
  invsprite1.visible = false
  invsprite2 = createSprite(width/2,height+40,width)
  invsprite2.visible = false
  imageMode(CENTER);
  coins = new Group()
  enemys1 = new Group()
}

function draw() {
  background(0, 255, 255);
  image(boardimg, width / 2, height / 1.35 + height / 20, width);
  //image(archerimg,width/2.6,height/2.5)
  drawSprites();
  invsprite1.x = mouseX
  invsprite1.y = mouseY
  invsprite2.overlap(coins,function(invsprite2, collided){
    collided.remove()
    charge1++
    if(charge1 == 5){
      charge1 = 0
      money += 25
    }
  })
  
  if (frameCount % shootingSpeed == 0) {
    shooting();
    shootingSpeed -= 1;
  }
  if(frameCount % 1000 == 0){
    produce()
  }
  if(frameCount % 100 == 0){
    enemy1h.Sprite = createSprite(width+50,random(height/2+100,height-100))
    enemy1h.Sprite.addAnimation("enemyAni",enemyAni)
    enemy1h.Sprite.velocityX = -2
    enemy1h.Sprite.scale = 3
    enemys1.add(enemy1h.Sprite)
  }
  if(frameCount%50 == 0){
    money_coin = createSprite(random(width-100,-width+100),height/20)
    money_coin.addImage(money_coinimg)
    money_coin.velocityY = 5 
    money_coin.scale = 2
    coins.add(money_coin)
  }
  for (var i = 0; i < arrows.length; i++) {
    if (arrows[i] >= width) {
      arrows[i].destroy;
    }
  }
  if (shootingSpeed <= 0) {
    shootingSpeed += 100;
  }
  textSize(50);
  text("money:" + money, 150, 150);
}
function mouseDragged() {
  if(clicou == 1){
    archer.x = mouseX;
  archer.y = mouseY;
  }
  if(clicou == 2){
    money_maker.x = mouseX;
    money_maker.y = mouseY;
  }
}
function mouseReleased(){
  if(clicou == 1){
    archers.push(archer)
  }
  if(clicou == 2){
    money_makers.push(money_maker)
  }
  
  clicou = 0
}
function shooting() {
for(i = 0; i < archers.length; i++){
   arrow = createSprite(archers[i].x, archers[i].y);
  arrow.addImage(arrowimg);
  arrow.scale = 2;
  arrow.velocityX += 5;
  arrows.push(arrow); 
  }
}
function produce() {
  for(i = 0; i < money_makers.length; i++){
    money_coinm = createSprite(money_makers[i].x,money_makers[i].y)
    money_coinm.addImage(money_coinimg)
    money_coinm.scale = 2
    coins.push(money_coinm)
  } 
}
/*function mouseClicked() {
  if (money > 0) {
    money -= 1;
    shooting();
  }
}*/
function mouseClicked() {
    invsprite1.overlap(coins,function(invsprite1, collided){
      collided.remove()
      money += 25
    })
    
  }
var clicou = 0
function place1() {
if(money >= 100){
  clicou+=1
  money-=100
  archer = createSprite(mouseX,mouseY)
archer.addAnimation("archerAni",archerAni)
archer.scale = 2
}
  
}
function place2() {
  if(money >= 50){
    clicou+=2
    money-=50
    money_maker = createSprite(mouseX,mouseY)
    money_maker.addAnimation("money_makerANI",money_makerAni)
    money_maker.scale = 2
  } 
}