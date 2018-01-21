export interface IScore{
    value: number,
    scoreContainer: any,
    drawScore(): void,
    scoreIncrement(): number
}