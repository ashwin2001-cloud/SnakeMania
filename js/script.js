var direction= {x: 0, y:0};
var lastPaintTime;

var snakeArr= [
    {x: 3, y: 7}
];

var food= {x: 13, y:9};

function main(ctime){
    window.requestAnimationFrame(main);
    // if((ctime-lastPaintTime)/1000<0.5){
    //     // console.log(ctime);
    //     return;
    // } 
    lastPaintTime= ctime;
    gameEngine();
}

function gameEngine(){

    //Display snake 
    var board= document.getElementById("board");
    board.innerHTML= "";
    for(var i=0;i<snakeArr.length;i++){
        var snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart= snakeArr[i].y;
        snakeElement.style.gridColumnStart= snakeArr[i].x;
        if(i==0){
            snakeElement.classList.add("head");
        }
        else snakeElement.classList.add("snake");
        board.append(snakeElement);
    }

    //Display food
    var foodElement= document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add("food");
    board.append(foodElement);
}

window.requestAnimationFrame(main);