export interface Event {
    id:number;
    name:string;
    available:boolean;
}

export const events:Event[] = [
    {id:1, name:"Event 1", available:true},
    {id:2, name:"Event 2", available:false},
    {id:3, name:"Event 3", available:true},
    {id:4, name:"Event 4", available:true}
]