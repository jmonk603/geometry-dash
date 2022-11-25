function setup() {
    var canvas = createCanvas(800, 800);
    canvas.parent("p5container");
}

var squaresize = 50;
var y1 = 700;
var x1 = 1;
var gravity = 10;
var isJumping = false;
var jumpheight = 20;
var jumpduration = 0;
var speed = 10;

let layout1 = [750];
let layout2 =  [700];
let layout3 = [750, 500];
let layout4 = [700, 750, 200];
let layout5 = [700, 750, 500, 550]
let layouts = [layout1,layout2,layout3,layout4,layout5];
let currentlayout = [];
var layoutnum = 0;
var x2 = 750
var canmove = false;
var colliding = false;

layoutnum = Math.floor(Math.random() * (layouts.length));

function draw() {
    background(220);
    fill(255, 255, 255);

    //player square setup/movement
    square(x1, y1, squaresize);

    y1 += gravity;
    if (y1 > 750){
        y1= 750;
    }
    x1 += speed;
    if (x1 > 250){
        x1 = 250;
        canmove = true;
    }

    if (isJumping == true){
        if (jumpduration < 15){
            y1 -= jumpheight;
            jumpduration += 1;
        }
        else{
            isJumping = false;
            jumpduration = 0;
        }
    }


    //obstacle squares
    currentlayout = layouts[layoutnum];

    for (let i = 0; i < currentlayout.length; i++){
        square(x2, currentlayout[i], squaresize);
    }

    if (canmove == true){
        if (colliding == false){
            x2 -= speed;
        }
    }

    if (x2 < -50){
        x2 = 800;
        layoutnum = Math.floor(Math.random() * (layouts.length));
    }

    if (x1 > (x2 - 30)){
        if (x1 < (x2 + 50)){
            if (y1 > (currentlayout[0] - 50)){
                y1 = (currentlayout[0] - 50);
            }
        }
    }
    if (x1 > (x2 - 50)){
        if (x1 < (x2 - 30)){
            if (y1 > (currentlayout[0] - 50)){
                colliding = true;
                x2 += speed;
            }
        }
    }
}

function reset(){
    y1 = 700;
    x1 = 1;
    x2 = 750;
    colliding = false;
    background(220);
    layoutnum = Math.floor(Math.random() * (layouts.length));
    canmove = false;
}

function keyPressed(){
    if (key === ' '){
        isJumping = true;
    }
    if (key === 'a'){
        reset();
    }
}
