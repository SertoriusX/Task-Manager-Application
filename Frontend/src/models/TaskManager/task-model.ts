export enum PriorityStatus {
  Low = 0,
  Medium = 1,
  High = 2
}


export interface TaskModel {
       id:number;
       title:string;
       description:string;
       dueDate: Date;
       priority: PriorityStatus;
       position:number;
       listId?: number;
}
