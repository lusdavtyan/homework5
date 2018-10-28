
const canv = document.getElementById('canvas');
const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};


canv.height = 700;
canv.width = 900;
const context = canv.getContext('2d');


const colorArray = ["red", "blue", "maroon", "magenta" , "deeppink" , "black", "white", "indianred", "pink", "cd5c5c"]


const createBoxes = function(count, canvasWidth, canvasHeight) {
const arr = [];
    for(let i = 0; i < count; i++){
        arr[arr.length] = {
            x: rand(canvasWidth - 30),
            y: rand(canvasHeight - 30),
            width: 30,
            height: 30,
            xDelta: rand(5),
            yDelta: rand(5),
            color: colorArray[rand(colorArray.length)-1],
            draw: function() {
                context.fillStyle = this.color;
                context.fillRect(this.x , this.y, this.width, this.height)},
            update: function() {
                if(this.x < 0 || this.x > canvasWidth - this.width){
                        this.xDelta *= -1; 

                }

                if(this.y < 0 || this.y > canvasHeight - this.height){
                        this.yDelta *= -1; 

                }

                this.x += this.xDelta;
                this.y += this.yDelta;
            }
        }
    }
return arr;
};

const boxes = createBoxes(100, canv.width, canv.height);

const loop_update = function(){
    for(let i = 0; i < boxes.length; i++){
        boxes[i].update();
    }
};

const loop_draw = function(){
    context.fillStyle = "lightblue";
    context.fillRect(0,0,canv.width,canv.height);
    for(let i = 0; i < boxes.length; i++){
        boxes[i].draw();
    }


};

const loop = function(){

    loop_update();
    loop_draw();

 requestAnimationFrame(loop);
}

loop();