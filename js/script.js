let direction= {x: 0, y:0};
let lastPaintTime;

let snakeArr= [
    {x: 15, y: 4}
];
let food= {x: 11, y: 7};

let score=0;
let highScore= 0;

let speed=20;

let gameSound= new Audio('Music/music.mp3');
let foodSound= new Audio('Music/food.mp3');
let moveSound= new Audio('Music/move.mp3');
let gameOverSound= new Audio('Music/gameover.mp3');

// gameSound.play();
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    } 
    lastPaintTime= ctime;
    gameEngine();
}

function isCollide(snakeArr){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y){
            return true;
        }
    }

    if(snakeArr[0].x<0 || snakeArr[0].x>18 || snakeArr[0].y<0 || snakeArr[0].y>18){
        return true;
    }
    return false;
}

function gameEngine(){

    //collision
    if(isCollide(snakeArr)){
        gameOverSound.play();
        gameSound.pause();
        direction= {x:0, y:0};
        snakeArr.splice(1);
        // console.log(snakeArr);
        snakeArr[0]= {x: Math.floor(Math.random() * (17 - 1 + 1) + 1), y: Math.floor(Math.random() * (17 - 1 + 1) + 1)};
        food= {x: Math.floor(Math.random() * (16 - 2 + 1) + 2), y: Math.floor(Math.random() * (16 - 2 + 1) + 2)};
        window.alert("Game over. Press any key to play again!");
        score=0;
    }
    
    //eats food
    if(food.x===snakeArr[0].x && food.y===snakeArr[0].y){
        foodSound.play();
        food= {x: Math.floor(Math.random() * (16 - 2 + 1) + 2), y: Math.floor(Math.random() * (16 - 2 + 1) + 2)};
        snakeArr.unshift({x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y});
        score++;
        if(score>highScore){
            highScore= score;
        }
    }

    //move snake
    for(let i=snakeArr.length-1;i>0;i--){
        snakeArr[i].x= snakeArr[i-1].x;
        snakeArr[i].y= snakeArr[i-1].y;
    }
    snakeArr[0].x+= direction.x; 
    snakeArr[0].y+= direction.y;

    //Display snake 
    let board= document.getElementById("board");
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
    let foodElement= document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add("food");
    board.append(foodElement);

    //Display score
    let scoreElement= document.getElementById("scoreContainer");
    scoreElement.innerHTML= `Score: ${score} <br>
    High score: ${highScore}`;
    scoreElement.style.fontSize= "30px";
}

window.addEventListener('keydown', function(e){
    if(gameSound.paused){
        gameSound.currentTime = 0;
        gameSound.play();
    }
    if(e.key=="ArrowUp"){
        direction.x=0;
        direction.y=-1;
    }
    else if(e.key=="ArrowDown"){
        direction.x=0;
        direction.y=1;
    }
    else if(e.key=="ArrowLeft"){
        direction.x=-1;
        direction.y=0;
    }
    else if(e.key=="ArrowRight"){
        direction.x=1;
        direction.y=0;
    }
    moveSound.play();
    // console.log(direction, e.key);
})

window.requestAnimationFrame(main);