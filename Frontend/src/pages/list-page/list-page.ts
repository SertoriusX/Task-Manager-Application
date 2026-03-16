import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { ListService } from '../../service/ListService/list-service';
import { TaskService } from '../../service/TaskService/task-service';
import { ListModel } from '../../models/ListModel/list-model';
import { BoardModel } from '../../models/BoardModel/board-model';
import { ListStateService } from '../../service/ListStateService/list-state-service';
import { TaskStateService } from '../../service/TaskStateService/task-state-service';
import { ListCard } from '../../components/list/list-card/list-card';

@Component({
  selector: 'app-list-page',
  imports: [CommonModule, FormsModule, ListCard, DragDropModule],
  templateUrl: './list-page.html',
  styleUrl: './list-page.css',
})
export class ListPage implements OnInit {

  @Input() board!: BoardModel;
  
  layoutMode: 'row' | 'column' = 'row';
  isBrowser: boolean;

  get orientation(): 'horizontal' | 'vertical' {
    return this.layoutMode === 'row' ? 'horizontal' : 'vertical';
  }

  constructor(
    private listSer: ListService, 
    private taskService: TaskService,
    public listState: ListStateService,
    public taskState: TaskStateService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.board?.id) {
      this.loadLists();
    }
  }

  get lists(): ListModel[] {
    if (!this.board?.id) return [];
    return this.listState.lists()
      .filter(l => l.boarId === this.board.id)
      .sort((a, b) => a.position - b.position);
  }

  toggleLayout() {
    this.layoutMode = this.layoutMode === 'row' ? 'column' : 'row';
  }

  loadLists() {
    if (!this.board?.id) return;
    const boardId=this.board.id
    this.listSer.listGetAll(boardId).subscribe({
      next: (res) => {
        this.listState.setList(boardId, res);
        res.forEach(list => {
          this.loadTasksForList(list.id);
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadTasksForList(listId: number) {
    this.taskService.taskGetAll(listId).subscribe({
      next: (res) => {
        this.taskState.setTasks(listId, res);
      },
      error: (err) => console.error(err)
    });
  }

  showForm = false;

toggleForm() {
  this.showForm = !this.showForm;
}
  createList(form: NgForm) {
    const title = form.value.title;
    if (!title || !this.board?.id) {
      console.error('Title or Board ID missing', { title, boardId: this.board?.id });
      return;
    }
    
    const boardId = Number(this.board.id);  
    const newList: ListModel = {
      title: title,
      position: this.lists.length + 1,
      boarId: boardId,
      id: 0
    };

    console.log('Creating list:', newList);

    this.listSer.listPost(boardId, newList).subscribe({
      next: (res) => {
        console.log('List created:', res);
        this.listState.postList(boardId, res);
        this.showForm = false;
      },
      error: (err) => {
        console.error('Error creating list:', err);
      }
    });
  }

  drop(event: CdkDragDrop<ListModel[]>) {
    const currentLists = [...this.lists];
    moveItemInArray(currentLists, event.previousIndex, event.currentIndex);
    
    currentLists.forEach((list, index) => {
      const updatedList = { ...list, position: index + 1 };
      this.listSer.listPut(this.board.id, list.id!, updatedList).subscribe({
        next: () => {
          this.listState.updateList(this.board.id, updatedList, list.id!);
        },
        error: (err) => console.error(err)
      });
    });
  }

}