class Snake {
  
  constructor() {
  	this.body = [];
    this.body[0] = createVector(floor(w/2), floor(h/2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }
  
  setDir(x, y) {
  	this.xdir = x;
    this.ydir = y;
  }
  
  update() {
  	let head = this.body[this.body.length-1].copy();
  	this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }
  
  grow() {
  	let head = this.body[this.body.length-1].copy();
  	this.len++;
  	this.body.push(head);
  }
  
  eat(pos) {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }
  
  endGame() {
  	let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
    if(x > w-1 || x < 0 || y > h-1 || y < 0) {
       return true;
    }
    for(let i = 0; i < this.body.length-1; i++) {
    	let part = this.body[i];
      if(part.x == x && part.y == y) {
      	return true;
      }
    }
    return false;
  }
  
  
  
  show() {
  	for(let i = 0; i < this.body.length; i++) {
    	fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1)
    }
  }

}

///////////////////////////////////////////////////////


let snake;
let rez = 20;
let food;
let w;
let h;

let audio;
let classifier;
let dir;

function preload(){
   classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/wOMVzCURt/model.json'); 
}

function setup() {
  createCanvas(640, 520);
  
  audio = createCapture(AUDIO);
  audio.hide();
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
  
  classifyAudio();
}

function classifyAudio(){
  classifier.classify(audio, (err, res) => {
    if(err){
      console.log(err);
    }
    dir = res[0].label;
    changeDir();
  });
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function changeDir() {
  if (dir === 'Left') {
    snake.setDir(-1, 0);
  } else if (dir === 'Right') {
    snake.setDir(1, 0);
  } else if (dir === 'Down') {
    snake.setDir(0, 1);
  } else if (dir === 'Up') {
    snake.setDir(0, -1);
  } 

}

function keyPressed() {
  dir = ' ';
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    snake.grow();
  }

}

function draw() {
  background(220);
  
  // image(video, 0, 0);
  textSize(32);
  fill(0);
  text(dir, width/2, height/2);
  scale(rez);
  
  
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();
  
  


  if (snake.endGame()) {
    print("END GAME");
    background(0, 125, 125);
    createP("Game Over! Your Score: " + snake.len);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}