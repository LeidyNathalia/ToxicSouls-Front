export class Evento{
    constructor(
        public name:string,
        public dateEvent:string,
        public price:number,
        public picture?:string,
        public hour?:string,
        public city?:string,
        public direction?:string,
        public description?:string
    ){ }
}
