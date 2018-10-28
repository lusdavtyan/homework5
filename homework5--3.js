

//3
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1000; 
canvas.height = 600;                      
let playing = true;

const rand = function(num) {
    return Math.floor(Math.random() * num) + 1;
};


const background = new Image();
background.src ="https://www.freevector.com/uploads/vector/preview/19766/8-06.jpg";

const narutoo = new Image();
narutoo.src ="http://laoblogger.com/images/all-naruto-clipart-5.jpg";

const tobi = new Image();
tobi.src = "https://static.tvtropes.org/pmwiki/pub/images/naruto__tobi.png";

const otherbadguys = [
'https://static.comicvine.com/uploads/original/11115/111157863/5054807-naruto_shippuden__jugo__cursed_seal_first__by_darkonas20-d6f1ghf.png',
'https://i.pinimg.com/originals/fb/57/16/fb5716982a5cc37afbdd7658e4532dcc.png',
'https://orig00.deviantart.net/504c/f/2012/307/7/1/chibi_kimimaro_kaguya_by_demoniumangel-d5jv2zt.png',
'https://orig00.deviantart.net/2836/f/2013/144/c/7/uchiha_itachi__akatsuki__by_katakitsu-d66du7j.png',
'https://orig00.deviantart.net/555a/f/2018/250/6/b/kimimaro_survivor_of_kaguya_clan_by_bodskih-dcm7nus.png'

];


const images = [];
for (let i = 0; i < otherbadguys.length; i++) {
    images[i] = new Image();
    images[i].src = otherbadguys[i]
}
const createchar = function(count, canvasWidth, canvasHeight) {
    const array = [];
    for (let i = 0; i < count; i++) {
        array[array.length] = {
            x: rand(canvasWidth - 70),
            y: rand(canvasHeight - 70),
            width: 70,
            height: 70,
            xDelta: rand(2),
            yDelta: rand(2),
            image: images[rand(array.length) - 1],
            draw: function() {
                context.drawImage(this.image, this.x, this.y, this.width, this.height)
            },

            update: function() {

                if (this.x < 0 || this.x > canvasWidth - this.width) {
                    this.xDelta *= -1;
                }
                if (this.y < 0 || this.y > canvasHeight - this.height) {
                    this.yDelta *= -1;
                }

                this.x += this.xDelta;
                this.y += this.yDelta;
            }
        };
    }
    return array;
};

const badguys = createchar(4, canvas.width, canvas.height);

const tobie = {
    x: 100,
    y: 100,
    width: 85,
    height: 180,
    xDelta: 1,
    yDelta: 1,
    image: tobi,

    draw: function() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    },
    update: function() {

        if (this.x < 0 || this.x > canvas.width - this.width) {
            this.xDelta *= -1;
        }
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.yDelta *= -1;
        }

        this.x += this.xDelta;
        this.y += this.yDelta;
    }
};

const naruto = {
    x: 880,
    y: 480,
    width: 80,
    height: 120,
    xDelta: 0,
    yDelta: 0,
    image: narutoo,

    draw: function() {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    },
    update: function() {
        if (this.x === tobie.x + tobie.width) {
            this.xDelta = 0;
        }

        if (Math.abs(naruto.x + naruto.width / 2 - (tobie.x + tobie.width / 2)) <= (naruto.width / 2 + tobie.width / 2) - 50 &&
            Math.abs(naruto.y + naruto.height / 2 - (tobie.y + tobie.height / 2)) <= (naruto.height / 2 + tobie.height / 2) - 20) {
            
            playing = false;

        }

        this.x += this.xDelta;
        this.y += this.yDelta;
        for (let i = 0; i < badguys.length; i++) {
            if (Math.abs(naruto.x + naruto.width / 2 - (badguys[i].x + badguys[i].width / 2)) <= (naruto.width / 2 + badguys[i].width / 2) - 20 &&
                Math.abs(naruto.y + naruto.height / 2 - (badguys[i].y + badguys[i].height / 2)) <= (naruto.height / 2 + badguys[i].height / 2) - 20) {
                playing = false;
                
            }
        }
    }
}

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
const space = 32;
document.addEventListener('keydown', function(event) {
    if (event.keyCode === rightKey) {
        if (naruto.x + naruto.width != 0)
            naruto.xDelta = 4;
    }
    if (event.keyCode === leftKey) {
        naruto.xDelta = -4;
    }
    if (event.keyCode === upKey) {
        naruto.yDelta = -4;
    }
    if (event.keyCode === downKey) {
        naruto.yDelta = 4;
    }

    if((event.keyCode === space || event.keyCode === 13 )&& !playing){
        location.reload();
    };
}, false);

document.addEventListener('keyup', function(event) {
    if (event.keyCode === rightKey || event.keyCode === leftKey) {
        naruto.xDelta = 0;
    }
    if (event.keyCode === upKey || event.keyCode === downKey) {
        naruto.yDelta = 0;
    }

}, false); 

const loop = function() {

    if(playing){
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        for (let i = 0; i < badguys.length; i++) {
            badguys[i].update();
            badguys[i].draw();
            
        }
        tobie.update();
        tobie.draw();
        
        naruto.update();
        naruto.draw();
        
        requestAnimationFrame(loop);    
    }else{
        alert("game over")
    }
    

};

loop();
