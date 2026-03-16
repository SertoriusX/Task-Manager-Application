import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardCreate } from '../../components/Board/board-create/board-create';
import { BoardCard } from '../../components/Board/board-card/board-card';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../service/BoardService/board-service';
import { BoardModel } from '../../models/BoardModel/board-model';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/AuthService/auth-service';
import { ListPage } from '../list-page/list-page';
import { ListCard } from '../../components/list/list-card/list-card';

@Component({
  selector: 'app-board',
  imports: [BoardCreate, BoardCard, CommonModule, RouterModule,ListPage],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {
  boardId: number | null = null;
  board: BoardModel | null = null;
  loading = true;
  isAuthenticated = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isAuthenticated = !!this.authService.getToken();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.boardId = id ? +id : null;
      console.log('Board ID:', this.boardId, 'Authenticated:', this.isAuthenticated);
      
      if (this.boardId && this.isAuthenticated) {
        this.loadBoard();
      } else {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadBoard() {
    if (!this.boardId) return;
    
    this.loading = true;
    this.errorMessage = '';
    this.boardService.boardGetById(this.boardId).subscribe({
      next: (res) => {
        this.board = res;
        this.loading = false;
        console.log('Board loaded:', this.board);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading board:', err);
        this.errorMessage = 'Failed to load board';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
