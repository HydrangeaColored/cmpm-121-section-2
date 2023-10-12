//purposely bad code so students can fix it - can make it worse

import './style.css';

// sprites
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

// score initialization
const scoreText = document.getElementById("scoreText");
let score = 0;
setText("click to start!");

// global vars
var isJumping = false;
let gameOver = true;

// jump listener
document.addEventListener('click', () => jump());

// main interval
setInterval(function () {Main()}, 10);

function Main(){
    // if game is not over, increment score and update text
    // check if game is over before incrementing score
    checkGameOver();
    if(gameOver == false){
        score++;
        setText("Score: " + score);
    }
}

// jump
function jump(){
    if(gameOver == false){
        if(isJumping == false){
            isJumping = true;
            dino?.classList.add("jump");
            setTimeout(removeJump, 500);
        }
    }
    else{
        startGame();
    }
}

// allow jump when landing
function removeJump(){
    dino?.classList.remove("jump");
    isJumping = false;
}

// delete unused obstacles
function removeObstacles(){
    cactus?.classList.remove("cactusMove");
    bird?.classList.remove("birdMove");
}

// game over check
function checkGameOver(){
    if(gameOver == false && dino != null && cactus != null && bird != null){
        //get is dinosaur jumping
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

        //get cactus position
        let cactusleft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

        //get bird position
        let birdleft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));

        //detect cactus collision
        if(dinoTop >= 150 && Math.abs(cactusleft) < 7){
            //end game
            console.log("player died!");
            setText("Final Score: " + score + "! Click To Play Again!");
            gameOver = true;

            //reset player
            removeJump();
            
            //reset cactus
            removeObstacles();
        }

        //detect bird collision
        if(dinoTop <= 55 && Math.abs(birdleft) < 11){
            //end game
            console.log("player died!");
            setText("Final Score: " + score + "! Click To Play Again!");
            gameOver = true;

            //reset player
            removeJump();
            
            //reset cactus
            removeObstacles();
        }
    }
}

// start game
function startGame(){
    console.log("Game started!");
    gameOver = false;
    score = 0;
    cactus?.classList.add("cactusMove");
    bird?.classList.add("birdMove");
}

// set message string
function setText(s: string){
    if(scoreText){
        scoreText.textContent = s;
    }
}
