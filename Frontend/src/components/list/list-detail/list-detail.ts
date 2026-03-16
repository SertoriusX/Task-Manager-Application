import { Component, OnInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskService } from '../../../service/TaskService/task-service';
import { TaskStateService } from '../../../service/TaskStateService/task-state-service';
import { ListStateService } from '../../../service/ListStateService/list-state-service';
import { AuthService } from '../../../service/AuthService/auth-service';
import { TaskModel } from '../../../models/TaskManager/task-model';
import { ListModel } from '../../../models/ListModel/list-model';

@Component({
  selector: 'app-list-detail',
  imports: [CommonModule, FormsModule, RouterModule, DragDropModule],
  templateUrl: './list-detail.html',
  styleUrl: './list-detail.css',
})
export class ListDetail implements OnInit {
  isAuthenticated = false;
  listId: number | null = null;
  isBrowser: boolean;
  showForm = false;
  showSuccess = false;
  successMessage = '';
  list: ListModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    public taskState: TaskStateService,
    public listState: ListStateService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.isAuthenticated = !!this.authService.getToken();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.listId = id ? +id : null;
      if (this.listId) {
        this.loadListFromState();
        this.loadTasks();
      }
    });
  }

  loadListFromState() {
    if (!this.listId) return;
    const lists = this.listState.lists();
    this.list = lists.find(l => l.id === this.listId) || null;
  }

  backList() {
    this.router.navigate(['/board']);
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/board']);
    }
  }

  get tasks(): TaskModel[] {
    if (!this.listId) return [];
    return this.taskState.tasks()
      .filter(t => t.listId === this.listId)
      .sort((a, b) => a.position - b.position);
  }

  get highPriorityTasks(): TaskModel[] {
    return this.tasks.filter(t => {
      const p = String(t.priority).toLowerCase();
      return p === 'high' || p === '2';
    });
  }

  get mediumPriorityTasks(): TaskModel[] {
    return this.tasks.filter(t => {
      const p = String(t.priority).toLowerCase();
      return p === 'medium' || p === '1';
    });
  }

  get lowPriorityTasks(): TaskModel[] {
    return this.tasks.filter(t => {
      const p = String(t.priority).toLowerCase();
      return p === 'low' || p === '0';
    });
  }

  loadTasks() {
    if (!this.listId) return;
    this.taskService.taskGetAll(this.listId).subscribe({
      next: (res) => {
        this.taskState.setTasks(this.listId!, res);
      },
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  createTask(form: NgForm) {
    const title = form.value.title;
    if (!title || !this.listId) return;

    const priorityMap: { [key: string]: string } = {
      '0': 'Low',
      '1': 'Medium', 
      '2': 'High'
    };
    const priorityValue = form.value.priority !== undefined && form.value.priority !== '' 
      ? priorityMap[String(form.value.priority)] || 'Low'
      : 'Low';

    const newTask: TaskModel = {
      id: 0,
      title: title,
      description: form.value.description || '',
      dueDate: new Date(),
      priority: priorityValue as any,
      position: this.tasks.length + 1,
      listId: this.listId
    };

    this.taskService.taskPost(this.listId, newTask).subscribe({
      next: (res) => {
        this.taskState.addTask(this.listId!, res);
        form.reset();
        this.showForm = false;
        this.showSuccess = true;
        this.successMessage = `Task "${res.title}" created successfully!`;
        setTimeout(() => {
          this.showSuccess = false;
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => console.error(err)
    });
  }

  deleteTask(id: number) {
    if (!this.listId) return;
    this.taskService.taskDelete(this.listId, id).subscribe({
      next: () => {
        this.taskState.removeTask(this.listId!, id);
      },
      error: (err) => console.error(err)
    });
  }

  updateTaskPosition(task: TaskModel, newPosition: number) {
    if (!this.listId || !task.id) return;
    const updatedTask = { ...task, position: Number(newPosition) };
    this.taskService.taskPut(this.listId, task.id, updatedTask).subscribe({
      next: () => {
        this.taskState.updateTask(this.listId!, updatedTask, task.id);
      },
      error: (err) => console.error(err)
    });
  }

  updateTaskPriority(task: TaskModel, newPriority: string) {
    if (!this.listId || !task.id) return;
    const updatedTask = { ...task, priority: newPriority as any };
    this.taskService.taskPut(this.listId, task.id, updatedTask).subscribe({
      next: () => {
        this.taskState.updateTask(this.listId!, updatedTask, task.id);
      },
      error: (err) => console.error(err)
    });
  }

  dropHigh(event: CdkDragDrop<TaskModel[]>) {
    const tasks = [...this.highPriorityTasks];
    if (event.previousContainer === event.container) {
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);
      this.updatePositions(tasks);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      this.updateTaskPriority(task, 'High');
    }
  }

  dropMedium(event: CdkDragDrop<TaskModel[]>) {
    const tasks = [...this.mediumPriorityTasks];
    if (event.previousContainer === event.container) {
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);
      this.updatePositions(tasks);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      this.updateTaskPriority(task, 'Medium');
    }
  }

  dropLow(event: CdkDragDrop<TaskModel[]>) {
    const tasks = [...this.lowPriorityTasks];
    if (event.previousContainer === event.container) {
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);
      this.updatePositions(tasks);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      this.updateTaskPriority(task, 'Low');
    }
  }

  updatePositions(tasks: TaskModel[]) {
    tasks.forEach((task, index) => {
      if (task.position !== index + 1) {
        const updatedTask = { ...task, position: index + 1 };
        this.taskService.taskPut(this.listId!, task.id, updatedTask).subscribe({
          next: () => {
            this.taskState.updateTask(this.listId!, updatedTask, task.id);
          },
          error: (err) => console.error(err)
        });
      }
    });
  }
}
