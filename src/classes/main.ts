import {Painter} from './painter';
import {Board} from './board';
import {Snake} from './snake';
import {Food} from "./food";

let canvas: any = document.getElementById('canvas');

let startButton: any = document.getElementById('start-button');
let startContent: any = document.getElementById('start-content');
let mainContent: any = document.getElementById('main-content');
let gameOverText: any = document.getElementById('game-over-msg');

startButton.addEventListener("click", function () {
    startContent.className = 'hide';
    mainContent.className = 'show';
    init();
});

let gameLoop:any;


function init(): void {
    // let firstTimeChecked: boolean = false;
    // var painter = new Painter(canvas);
    // var snake:Snake = new Snake(6, 'green', 'darkgreen');
    // var food:Food = new Food();
    // var board:Board = new Board(painter, snake, food, 450, 650, 20);
    // board.init();
    gameLoop = setInterval(function () {
        let painter = new Painter(canvas);
        let snake:Snake = new Snake(6, 'green', 'darkgreen');
        let food:Food = new Food();
        let board:Board = new Board(painter, snake, food, 450, 650, 20);

        board.init();
        snake.move();

        if(board.checkBoundary() || snake.checkCollision()){
            gameLoop = clearInterval(gameLoop);
            mainContent.className = 'hide';
            startContent.className = 'show';
            gameOverText.className = 'show';
            startButton.innerHTML = "Start Again";
            startButton.setAttribute('disabled', false);

        }

        // if(snake.eatFood(food.position)){
        //     firstTimeChecked = false;
        // }

        document.onkeydown = function (event) {
            let keyCode:number = event.keyCode;
            snake.changeDirection(keyCode)
        }

        board.drawSnake();
        // board.drawFood();
    }, 150)
}

