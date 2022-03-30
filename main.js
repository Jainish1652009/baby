song = "";
status = "";
object = [];

function preload(){
    song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function draw() {
    image(video,0, 0, 380 , 380);

    if(status != "");
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
         for (i = 0; i < object.length; i++)
         {
             fill(r,g,b);     
             precent = floor(object[i].confidence * 100);
             text(object[i].label + " " + precent + "%", object[i].x +10, object[i].y +10);
             noFill();
             stroke(r,g,b);
             rect(object[i].x, object[i].y, object[i].width, object[i].height);
             if(object[i].label=="person"){
                document.getElementById("status").innerHTML = "Baby Faund";
                song.stop();
             } else {
                document.getElementById("status").innerHTML = "Baby not Faund";
                song.play();
             }
         }
    }

}