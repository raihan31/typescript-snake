import {Painter} from './painter';
import {Board} from './board';
import {Snake} from './snake';
import {Food} from "./food";
import {Score} from "./score";

let canvas: any = document.getElementById('canvas');

let startButton: any = document.getElementById('start-button');
let startContent: any = document.getElementById('start-content');
let mainContent: any = document.getElementById('main-content');
let gameOverText: any = document.getElementById('game-over-msg');
let scoreContainer: any = document.getElementById('score');

startButton.addEventListener("click", function () {
    startContent.className = 'hide';
    mainContent.className = 'show';
    init();
});

let gameLoop:any;


function init(): void {
    var painter = new Painter(canvas);
    var snake:Snake = new Snake(5, 'green', 'darkgreen');
    var food:Food = new Food();
    var score: Score = new Score(0, scoreContainer);
    var board:Board = new Board(painter, snake, food, 600, 600, 20, score);
    board.init();
    let intervalCount: number = 200; 
    gameLoop = setInterval(function () {
        board.init();
        snake.move();

        if(board.checkBoundary() || snake.checkCollision()){
            gameLoop = clearInterval(gameLoop);
            mainContent.className = 'hide';
            startContent.className = 'show';
            gameOverText.className = 'show';
            startButton.innerHTML = "Start Again";
        }

        if(snake.eatFood(food.position)){
            food.createFood();
            board.drawSnake();
            score.scoreIncrement();
            board.drawScore();
            board.drawFood();
            intervalCount -= 20; 
        }

        document.onkeydown = function (event) {
            let keyCode:number = event.keyCode;
            snake.changeDirection(keyCode)
        }

        board.drawSnake();
        board.drawFood();
        board.drawScore();
    }, intervalCount)
}

