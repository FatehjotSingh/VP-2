var pet;
var petI,petI2;
var database;
var milkCount,milk,milkImg;
var milkCountref;
var feed,restock;
var baseMilk
var lastfed
var x,y,a,b;
var feedTime
function preload()
{
  petI=loadAnimation("images/dogImg.png")
  petI2=loadAnimation("images/dogImg1.png")
  milkImg=loadImage("images/Milk.png")
}
function setup() {
  database=firebase.database();
  createCanvas(1400, 700);
  baseMilk=20
  dog=createSprite(1200,400,30,30)
  dog.addAnimation("sad",petI2)
  dog.addAnimation("happy",petI)
  dog.scale=0.4
 
  
  
  
  feed=createButton("Feed")
  restock=createButton("Restock Milk")
  feed.position(1000,50);
  restock.position(500,50);
  milkCountref=database.ref("Dog/milk")
  milkCountref.on("value",readCount,showerror)
  
}


function draw() {  
  
  background("lightgreen")
  textSize(20)
  text("Milk="+milkCount,1200,50)
  drawSprites();
  
  text("last feed= "+lastfed+":00",750,50)
  x=80
  y=100
 // a=80
  //b=200
  //add styles here
  if(milkCount!=0){
 
 for (var i=0;i<milkCount;i++){
  if(i%10===0){
    x=80;
    y=y+75;
  } 
  
   imageMode(CENTER)
   image(milkImg,x,y,75,75)
   x=x+50;
 }
}
  feed.mousePressed(function(){
    Eat(milkCount)
    
    lastfed=hour();
    console.log(lastfed)
    dog.changeAnimation("happy",petI)
    dog.scale=0.4
  })
  restock.mousePressed(function(){
    Restock(50)
    })
    if(keyDown("r")){
      Restock(50)
      }
    
  
}

function Eat(milkCount){
  if(milkCount<=0){milkCount=0}
  else{milkCount=milkCount-1}
   database.ref("Dog").update({
    milk:milkCount,
    feedTime:hour()
  })
}
function Restock(milkCount){
  database.ref("Dog").update({
    milk:milkCount
  })
}

function readCount(data){
  milkCount=data.val();
}
function showerror(){
  console.log("try agen")
}