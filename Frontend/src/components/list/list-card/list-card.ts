import { Component, Input, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { ListModel } from '../../../models/ListModel/list-model';
import { ListService } from '../../../service/ListService/list-service';
import { ListStateService } from '../../../service/ListStateService/list-state-service';
import { TaskStateService } from '../../../service/TaskStateService/task-state-service';

@Component({
  selector: 'app-list-card',
  imports: [CommonModule, DragDropModule, RouterModule],
  templateUrl: './list-card.html',
  styleUrl: './list-card.css',
})
export class ListCard implements OnInit {
  @Input() list!: ListModel;
  isBrowser: boolean;
  
  constructor(
    private listSer: ListService,
    public listStateSer: ListStateService,
    public taskState: TaskStateService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  get taskCount(): number {
    if (!this.list?.id) return 0;
    return this.taskState.tasks().filter(t => t.listId === this.list.id).length;
  }

  getAll() {
    if (!this.list?.boarId) return;
    const boardId = this.list.boarId;
    this.listSer.listGetAll(boardId).subscribe({
      next: (res) => this.listStateSer.setList(boardId, res),
      error: (err) => console.error(err)
    });
  }

  get boardLists(): ListModel[] {
    if (!this.list?.boarId) return [];
    return this.listStateSer.lists().filter(l => l.boarId === this.list.boarId);
  }

  get positions(): number[] {
    const count = this.boardLists.length;
    return count > 0 ? Array.from({ length: count }, (_, i) => i + 1) : [1];
  }

  removeList(id: number) {
    if (!this.list?.boarId) return;
    const boardId = this.list.boarId;
    this.listSer.listDelete(boardId, id).subscribe({
      next: () => {
        this.listStateSer.removeList(boardId, id);
      },
      error: (err) => console.error(err)
    });
  }

  onPositionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.updatePosition(target.value);
  }

  updatePosition(newPosition: any) {
    if (!this.list?.boarId || !this.list?.id) return;
    const boardId = this.list.boarId;
    const updatedList = { ...this.list, position: Number(newPosition) };
    this.listSer.listPut(boardId, this.list.id, updatedList).subscribe({
      next: () => {
        this.listStateSer.updateList(boardId, updatedList, this.list.id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error updating position:', err)
    });
  }
}
