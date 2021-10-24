let video;
let poseNet;
let nose;
let pose;
let x,y,score=[];
let NG,EG;
let s=0;
var state=0;
function preload()
{
  NG=createButton("NEW GAME");
  EG=createButton("END GAME");
  NG.mouseClicked(ng);
  EG.mouseClicked(eg);
}
function setup() {
createCanvas(windowWidth, windowHeight);
video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight)
video.hide();
  score[s]=0;
x=random(255);
  y=random(255);
poseNet = ml5.poseNet(video, modelReady);
poseNet.on('pose', gotPoses);
  
}

function gotPoses(poses) {
if (poses.length > 0) {
nose = poses[0].pose.nose;

}
pose=poses
}

function modelReady() {
 return 0;
}

function ng()
{
  state=0;
  s++;
  setup();
  score[s]=0;
}
function eg()
{
  state=1;
}

function draw() {
image(video,0,0,windowWidth,windowHeight);
  fill(0,255,0)
  rect(0,0,100,40)
  fill(0)
  text("score is : "+score[s],20,22)
  textFont("arial")
  fill(0,0,252);
  circle(x,y,25)
if (pose){
  fill(252,0,0)
circle(nose.x,nose.y,30)
  if(nose.x-25<x&&x<nose.x+25&&nose.y-25<y&&y<nose.y+25)
    {
      x=random(255);
      y=random(255);
      score[s]++;
    }
  }
  if(state==1)
    {
      background(0);
      var hi=0;
      textSize(48);
      fill(0,255,0);
      text("Thankyou for playing",windowWidth/2-250,windowHeight/2-50)
      textSize(36);
      fill(255,0,0)
      text("Current score :"+score[s],windowWidth/2-50,(windowHeight/2))

      for(var i=0;i<score.length;i++)
        {
          if(hi<score[i])
            {
               hi=score[i]; 
            }
        }
      text("High score : "+hi,windowWidth/2-50,(windowHeight/2)+50);
    }
}