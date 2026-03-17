import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../../models/TaskManager/task-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

constructor(private http:HttpClient){}
  private backApi=`${environment.apiUrl}/list`

  taskGetAll(listId:number) :Observable<TaskModel[]>{
    return this.http.get<TaskModel[]>(`${this.backApi}/${listId}/Task`);
  }

  taskGetById(listId:number,id:number) :Observable<TaskModel>{
    return this.http.get<TaskModel>(`${this.backApi}/${listId}/Task/${id}`)
  }
  taskPost(listId:number,board:TaskModel) :Observable<TaskModel>{
    return this.http.post<TaskModel>(`${this.backApi}/${listId}/Task`,board)
  }
  taskPut(listId:number,id:number,board:TaskModel) :Observable<TaskModel>{
    return this.http.put<TaskModel>(`${this.backApi}/${listId}/Task/${id}`,board)
  }
  taskDelete(listId:number,id:number) :Observable<void>{
    return this.http.delete<void>(`${this.backApi}/${listId}/Task/${id}`)
  }

}
