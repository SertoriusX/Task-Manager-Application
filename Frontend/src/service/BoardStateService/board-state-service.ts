import { Injectable, signal } from '@angular/core';
import { BoardModel } from '../../models/BoardModel/board-model';

@Injectable({
  providedIn: 'root',
})
export class BoardStateService {

  boards = signal<BoardModel[]>([]);
  selectedBoard = signal<BoardModel | null>(null);

  setBoards(boards: BoardModel[]) {
    this.boards.set(boards);
  }

  addBoard(board: BoardModel) {
    this.boards.update(curr => [...curr, board]);
  }

  updateBoard(id: number, board: BoardModel) {
    this.boards.update(curr =>
      curr.map(b => (b.id === id ? { ...b, ...board } : b))
    );
  }

  removeBoard(id: number) {
    this.boards.update(curr => curr.filter(b => b.id !== id));
  }
}