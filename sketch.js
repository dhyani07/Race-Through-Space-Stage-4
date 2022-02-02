var spaceShip,spaceShipImage;
var ISS, ISSImage;
var Alien, AlienImage;
var Energy, EnergyImage;

var Mercury, MercuryImage;
var Venus, VenusImage;
var Earth, EarthImage;
var Mars, MarsImage;
var Jupiter1, JupiterImage;
var Saturn, SaturnImage;
var Uranus, UranusImage;
var Neptune, NeptuneImage;

var gameState = 1;
var score = 0;
var count =0;

function preload (){
    bgImage = loadImage("Images/BackgroundImage.gif");
    spaceShipImage = loadImage("Images/MainCharacter.png");
    ISSImage = loadImage("Images/DestinationImage.png");
    AlienImage = loadAnimation("Images/Enemy2Image.png", "Images/Enemy1Image.png");
    EnergyImage = loadImage("Images/EnergyImage.png");

    MercuryImage = loadImage("Images/MercuryImg.png");
    VenusImage = loadImage("Images/VenusImg.png");
    EarthImage = loadImage("Images/EarthImg.png");
    MarsImage = loadImage("Images/MarsImg.png");
    JupiterImage = loadImage("Images/JupiterImg.png");
    SaturnImage = loadImage("Images/SaturnImg.png");
    UranusImage = loadImage("Images/UranusImg.png");
    NeptuneImage = loadImage("Images/NeptuneImg.png");
}

function setup (){
    createCanvas (1000,600);
    spaceShip = createSprite(80,560,40,40);
    spaceShip.addImage("SpaceshipImage", spaceShipImage);
    spaceShip.scale = 0.1;
    spaceShip.debug = false;
    spaceShip.setCollider("rectangle",0,0,600,400);

    ISS = createSprite(880,75,40,40);
    ISS.addImage("ISS", ISSImage);
    ISS.scale = 0.3;

    Alien = createSprite(350,150,40,40);
    Alien.addAnimation("Alien", AlienImage);
    Alien.scale = 0.15;


    Mercury = createSprite(420,530,40,40);
    Mercury.addImage("Mercury", MercuryImage);
    Mercury.scale = 0.07;
    Mercury.debug = true;

    Venus = createSprite(280,360,40,40);
    Venus.addImage("Venus", VenusImage);
    Venus.scale = 0.07;
    Venus.debug = true;

    Earth = createSprite(260,130,40,40);
    Earth.addImage("Earth", EarthImage);
    Earth.scale = 0.04;
    Earth.debug = true;

    Mars = createSprite(557,111,40,40);
    Mars.addImage("Mars", MarsImage);
    Mars.scale = 0.1;
    Mars.debug = true;

    Jupiter= createSprite(572,299,40,40);
    Jupiter.addImage("Jupiter", JupiterImage);
    Jupiter.scale = 0.3;
    Jupiter.debug = true;

    Saturn = createSprite(774,429,40,40);
    Saturn.addImage("Saturn", SaturnImage);
    Saturn.scale = 0.15;
    Saturn.debug = true;

    Uranus = createSprite(85,225,40,40);
    Uranus.addImage("Uranus", UranusImage);
    Uranus.scale = 0.04;
    Uranus.debug = true;

    Neptune = createSprite(800,226,40,40);
    Neptune.addImage("Neptune", NeptuneImage);
    Neptune.scale = 0.05;
    Neptune.debug = true;

    gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

    Energygroup = new Group();
}


function draw (){
    background (bgImage);
    text(mouseX + "," + mouseY, mouseX, mouseY);
    fill("white");
    textSize(20);
    text("Score: " + score,59,37);

    if (gameState == 1){
        if (keyIsDown(RIGHT_ARROW)){
            spaceShip.x = spaceShip.x + 2;
        }

        if (keyIsDown(LEFT_ARROW)){
            spaceShip.x = spaceShip.x - 2;
        }

        if (keyIsDown(UP_ARROW)){
            spaceShip.y = spaceShip.y - 2;
        }

        if (keyIsDown(DOWN_ARROW)){
            spaceShip.y = spaceShip.y + 2;
        }

        spawnEnergy();

        for (var i = 0; i < Energygroup.length; i++) { 
            if (Energygroup.get(i).isTouching(spaceShip)) {
                 Energygroup.get(i).destroy(); 
                 score = score + 1;
                }
             }

             if(spaceShip.isTouching(Mercury)||
             spaceShip.isTouching(Venus)||
             spaceShip.isTouching(Earth)||
             spaceShip.isTouching(Mars)||
             spaceShip.isTouching(Jupiter)||
             spaceShip.isTouching(Saturn)||
             spaceShip.isTouching(Uranus)||
             spaceShip.isTouching(Neptune)){
                 /*count=1;
                 if(Math.round(getFrameRate()/60)==1){
                     score=score-1;
                 }
                 console.log(Math.round(getFrameRate()/60))
                //score = score - Math.round(getFrameRate()/70);
                */
             }

             if(spaceShip.isTouching(Alien))
             {
                 gameState=0;
             }



    }
    else if (gameState == 0){
        text("Game Over");
    }
    
    drawSprites();
}

function spawnEnergy() {

    if (World.frameCount%60 === 0)
      {
      //rand = Math.round(random(80,120));
      Energy = createSprite(600,120,10,10);
      Energy.x = Math.round(random(100,900));
      Energy.y = Math.round(random(100,500));
      Energy.debug = false;
      Energy.setCollider("rectangle",0,0,50,50);
      //console.log(rand);
      Energy.addImage ("Energy", EnergyImage);
      Energy.scale = 0.1;
      //Energy.velocityX = -5;
      //trex.depth = Energy.depth +  1;
      //Energy.lifetime = 150;
      Energygroup.add(Energy);
      }
    }

    function reset(){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
        
        obstaclesGroup.destroyEach();
        
        trex.changeAnimation("running",trex_running);
               
        score = 0;
        
      }