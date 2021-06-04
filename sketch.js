//Create variables here
var dog, dogImg, dogImg1, database, foods, foodStock;

function preload()
{
	//load images here
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  dog = createSprite(250.350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() {  
  backgroung("green");
  if (foods!==undefined){
    textSize(20);
    fill(255);
    text("NOTE: Press UP_ARROW Key To Feed Draco Milk!")
    text("Food Remaining :"+foods ,150,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foods);
      dog.addImage(dogImg1);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }

    if(foods === 0){
      foods=20;
    }
  }

  drawSprites();
 }


function readStock(data){
  foods=data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

