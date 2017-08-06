var ong = [];
var chim, ong1, ong2, canvas, context;
var diem = 0;
function setup() {
    createCanvas(500, 887);
    frameRate(50);
    setBackground();

    chim = new bird();
    ong.push(new pipe());


    setInterval(() => {
        ong.push(new pipe());
    }, 5000)   
}


function draw(){
    context.drawImage(img, 0, 0);
    chim.update();
    chim.show();

    if(ong.length > 0){
        for(var i = 0; i < ong.length; i++){
            ong[i].update();
            ong[i].show();
            if(ong[i].plusScore(chim)){
                diem += 1;
                console.log(diem);
            }
        }
    }
}

function keyPressed(){
    if(key === ' '){
        chim.up();
    }
}

function setBackground(){
    canvas  = document.getElementById('defaultCanvas0');
    context = canvas.getContext('2d');
    img     = new Image();
    img.src = 'assets/background.jpg'
    rect(40, 120, 120, 40);
}


function bird(){
    this.x = 64;
    this.y = height/2;
    
    this.gravity = 0.6;
    this.lift    = -15;
    this.velocity = 0;

    this.up = () => {
        this.velocity += this.lift;
    }

    this.update = () => {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;

        if(this.y >= height){
            this.y = height;
            this.velocity = 0;

            var gameOver = confirm(`Game over, score: ${diem}`);
            if(gameOver){
                restartGame();   
            }
        }
    }

    this.show = () => {
        fill(color(255, 255, 255));
        ellipse(this.x, this.y, 20, 20);
    }
}

function pipe(){
    this.death  = false;
    this.x      = width + 50;

    this.width  = 30;
    this.height = height/2 - 50;

    var bottomLeftMin = height - this.height;

    this.topScale    = [0, -20, -40, -80, -100, -200];
    this.bottomScale = [bottomLeftMin, bottomLeftMin + 30, bottomLeftMin + 40, bottomLeftMin + 70, bottomLeftMin + 100];

    this.topLeft     = this.topScale[floor((Math.random() * 5))];
    this.bottomLeft  = this.bottomScale[floor((Math.random() * 5))];

    this.kill = pos => {
        if(pos.x >= this.x && pos.x <= this.x + this.width){
            if(pos.y <= this.topLeft + this.height){
                return true;
            }

            if(pos.y >= this.bottomLeft){
                return true;
            };

            return false;
        }

        return false;
    }

    this.plusScore   = pos => {
        if(!this.death){
            if(!this.kill(pos)){
                if(this.x + this.width < pos.x){
                    this.death = true;
                    return true;
                }
            }else{
                var gameOver = confirm(`Game over, score: ${diem}`);
                if(gameOver){
                    restartGame();   
                }
            }

            return false;
        }

        return false;
    }

    this.update = () => {
        this.x -= 1;
    }

    this.show = () => {
        rect(this.x, this.topLeft, this.width, this.height);
        rect(this.x, this.bottomLeft, this.width, this.height);
    }
}

function restartGame(){
    ong  = [];
    chim = new bird();
}