import {IPainter} from './ipainter';
import {IFood} from './ifood';

export interface IBoard {
    painter: IPainter,
    height:number,
    width: number,
    size:number,
    food: IFood,
    drawSnake():void,
    drawFood(food: any):void,
    drawScore():void,
    init():void
}