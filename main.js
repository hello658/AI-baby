img = "";
status = "";
objects = [];
function preload(){
MyAlert = loadSound("mariah_christmas_isu.mp3");
}

function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDectector = ml5.objectDetector('cocossd', modelLoaded)
document.getElementById("status").innerHTML = "status : Detecting Objects"
}

function draw() {
image(video, 0, 0, 380, 380);

if(status != "")
{
  r = random(255);
  g = random(255);
  b = random(255);
  objectDectector.detect(video, gotResult);
  for(i = 0; i < objects.length; i++){
 document.getElementById("status").innerHTML = "Status : Object Detected";
 document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
 fill(r,g,b);
 percent = floor(objects[i].cofidence * 100);
 text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
 noFill();
 stroke(r,g,b);
 rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
 if(objects[i].label !="person"){
 MyAlert.play();
 }
 }
}

function modelLoaded() {
console.log("Model Loaded!")
status = true;
objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
 if (error) {
   console.log(error);
   objects = results;
 }
 console.log(results);
}