import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardModel } from '../../models/BoardModel/board-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http:HttpClient){}
  private backApi=`${environment.apiUrl}/Board`

  boardGetAll() :Observable<BoardModel[]>{
    return this.http.get<BoardModel[]>(this.backApi);
  }

  boardGetById(id:number) :Observable<BoardModel>{
    return this.http.get<BoardModel>(`${this.backApi}/${id}`)
  }
  boardPost(board:BoardModel) :Observable<BoardModel>{
    return this.http.post<BoardModel>(this.backApi,board)
  }
  boardPut(id:number,board:BoardModel) :Observable<BoardModel>{
    return this.http.put<BoardModel>(`${this.backApi}/${id}`,board)
  }
  boardDelete(id:number) :Observable<void>{
    return this.http.delete<void>(`${this.backApi}/${id}`)
  }
}
