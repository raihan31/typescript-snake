
import {IPosition} from '../interfaces/iposition';
import {IFood} from '../interfaces/ifood';

export class Food implements IFood{
    position: IPosition;
    constructor(){
        this.createFood();
    }
    createFood():void{
        let pos = {
            x:Math.floor(Math.random() * 30),
            y:Math.floor(Math.random() * 30)
        }
        this.position = pos;
    }
}