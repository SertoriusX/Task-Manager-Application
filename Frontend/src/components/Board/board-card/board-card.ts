import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BoardService } from '../../../service/BoardService/board-service';
import { BoardStateService } from '../../../service/BoardStateService/board-state-service';
import { AuthService } from '../../../service/AuthService/auth-service';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-card',
  imports: [CommonModule, DragDropModule],
  templateUrl: './board-card.html',
  styleUrl: './board-card.css',
})
export class BoardCard implements OnInit {
  loading = true;
  isAuthenticated = false;
  error: string | null = null;
  layoutMode: 'row' | 'column' = 'row';
  isBrowser: boolean;

  constructor(
    private borCard: BoardService,
    public boardSerState: BoardStateService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.isAuthenticated = !!this.authService.getToken();
    if (this.isAuthenticated) {
      this.getAllBoard();
    } else {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  getAllBoard() {
    this.borCard.boardGetAll().subscribe({
      next: (res) => {
        this.boardSerState.setBoards(res);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Failed to load boards';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  get boards(): any[] {
    return this.boardSerState.boards();
  }

  get positions(): number[] {
    const count = this.boards.length;
    return count > 0 ? Array.from({ length: count }, (_, i) => i + 1) : [1];
  }

  seeMore(boardId: number) {
    this.router.navigate(['/board', boardId]);
  }

  deleteBoard(id: number) {
    this.borCard.boardDelete(id).subscribe({
      next: () => {
        this.boardSerState.removeBoard(id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatePosition(boardId: number, newPosition: number) {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) return;
    const updatedBoard = { ...board, position: newPosition };
    this.borCard.boardPut(boardId, updatedBoard).subscribe({
      next: () => {
        this.boardSerState.updateBoard(boardId, updatedBoard);
      },
      error: (err) => console.error(err)
    });
  }

  toggleLayout() {
    this.layoutMode = this.layoutMode === 'row' ? 'column' : 'row';
  }

  drop(event: CdkDragDrop<any[]>) {
    const currentBoards = [...this.boards];
    moveItemInArray(currentBoards, event.previousIndex, event.currentIndex);
    
    currentBoards.forEach((board, index) => {
      const updatedBoard = { ...board, position: index + 1 };
      this.borCard.boardPut(board.id, updatedBoard).subscribe({
        next: () => {
          this.boardSerState.updateBoard(board.id, updatedBoard);
        },
        error: (err) => console.error(err)
      });
    });
  }
}
