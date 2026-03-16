import { Injectable, signal } from '@angular/core';
import { ListModel } from '../../models/ListModel/list-model';

@Injectable({
  providedIn: 'root',
})
export class ListStateService {
  lists=signal<ListModel[]>([]);

  setList(boardId: number, newLists: ListModel[]) {
    this.lists.update(curr => [
      ...curr.filter(l => l.boarId !== boardId),
      ...newLists.map(l => ({ ...l, boarId: boardId }))
    ]);
  }
  postList(boardId:number, list: ListModel){
    this.lists.update(curr=>[...curr,{...list,boarId:boardId}]);
  }

  removeList(boardId:number, id:number){
    this.lists.update(curr=>curr.filter(l=>!(l.id===id&&l.boarId===boardId)))
  }

  updateList(boardId: number, updatedList: ListModel, id: number) {
    this.lists.update(curr =>
      curr.map(l => (l.id === id && l.boarId === boardId ? { ...l, position: updatedList.position } : l))
    );
  }
}
