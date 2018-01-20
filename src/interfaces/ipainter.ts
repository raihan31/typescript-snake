export interface IPainter{
    canvas:any,
    context: any,
    fillArea(x1:number, y1:number,x2:number, y2:number, color:string):void,
    strokeArea(x1:number, y1:number,x2:number, y2:number, color:string):void
}
