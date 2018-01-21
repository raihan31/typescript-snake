import {IPainter} from '../interfaces/ipainter';
import {IFood} from '../interfaces/ifood';
import {ISnake} from '../interfaces/isnake';
import {IBoard} from '../interfaces/iboard';
import {IScore} from '../interfaces/iscore';

export class Board implements IBoard{
    painter: IPainter;
    score: IScore;
    snake: ISnake;
    height:number;
    width: number;
    size:number;
    food: IFood;
    constructor(painter: IPainter, snake: ISnake, food: IFood,h:number, w:number, s:number, score: IScore){
        this.height = h;
        this.width = w;
        this.size = s;
        this.painter = painter;
        this.snake = snake;
        this.food = food;
        this.score = score;
    }
    drawSnake():void{
        for (var i = 0; i < this.snake.cells.length; i++) {
            var cell = this.snake.cells[i];
            if(i==0){
                this.drawSnakeCell(cell.x, cell.y, true);
            } else {
                this.drawSnakeCell(cell.x, cell.y, false);
            }

        }
    }
    drawSnakeCell(x:number, y:number, isHead:boolean){
        if(isHead){ 
            this.painter.fillArea(x*this.size, y*this.size, this.size, this.size, "#E30F0E");
            this.painter.strokeArea(x*this.size, y*this.size, this.size, this.size, "#E30F0E");
        } else {
            this.painter.fillArea(x*this.size, y*this.size, this.size, this.size, "#007bff");
            this.painter.strokeArea(x*this.size, y*this.size, this.size, this.size, "#007bff");
        }
    }
    drawFood():void{
        this.painter.fillArea(this.food.position.x*this.size, this.food.position.y*this.size, this.size, this.size, "#6610f2");
        this.painter.strokeArea(this.food.position.x*this.size, this.food.position.y*this.size, this.size, this.size, "#6610f2");

    }
    drawScore():void{
        this.score.drawScore();
    }
    checkBoundary(): boolean{
        return this.snake.checkBoundary(-1,  this.width/this.size, -1, this.height/this.size);
    }
    init():void{
        this.painter.fillArea(0, 0, this.width, this.height, "rgba(250, 250, 250, 0.5)")
        this.painter.strokeArea(0, 0, this.width, this.height,"rgba(250, 250, 250, 0.5)")
    }
}