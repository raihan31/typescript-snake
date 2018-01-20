
import {IPosition} from '../interfaces/iposition';
import {IFood} from '../interfaces/ifood';

export class Food implements IFood{
    position: IPosition;
    constructor(){
        this.createFood();
    }
    createFood():void{
        let pos = {
            x:Math.random()*30,
            y:Math.random()*30
        }
        this.position = pos;
    }
}