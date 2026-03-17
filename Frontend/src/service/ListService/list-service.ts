import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListModel } from '../../models/ListModel/list-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {



  constructor(private http:HttpClient){}
  private backApi=`${environment.apiUrl}/boards`

  listGetAll(boardId:number) :Observable<ListModel[]>{
    return this.http.get<ListModel[]>(`${this.backApi}/${boardId}/ListB`);
  }

  listGetById(boardId:number,id:number) :Observable<ListModel>{
    return this.http.get<ListModel>(`${this.backApi}/${boardId}/ListB/${id}`)
  }
  listPost(boardId:number,list:ListModel) :Observable<ListModel>{
    return this.http.post<ListModel>(`${this.backApi}/${boardId}/ListB`,list)
  }
  listPut(boardId:number,id:number,list:ListModel) :Observable<ListModel>{
    return this.http.put<ListModel>(`${this.backApi}/${boardId}/ListB/${id}`,list)
  }
  listDelete(boardId:number,id:number) :Observable<void>{
    return this.http.delete<void>(`${this.backApi}/${boardId}/ListB/${id}`)
  }
}
