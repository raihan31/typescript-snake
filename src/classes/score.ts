import { IScore } from "../interfaces/iscore";

export class Score implements IScore{
    value: number;
    scoreContainer: any;
    constructor(value: number, container: any ){
        this.value = value;
        this.scoreContainer = container;
    }

    drawScore(): void {
        this.scoreContainer.innerHTML = 'Score: ' + this.value; 
    }

    scoreIncrement(): number {
        this.value += 20; 
        return this.value;
    } 
}