import { Injectable, signal } from '@angular/core';
import { TaskModel } from '../../models/TaskManager/task-model';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  tasks = signal<TaskModel[]>([]);

  setTasks(listId: number, newTasks: TaskModel[]) {
    this.tasks.update(curr => [
      ...curr.filter(t => t.listId !== listId),
      ...newTasks.map(t => ({ ...t, listId: listId }))
    ]);
  }

  setTasksByPriority(listId: number, priority: number, newTasks: TaskModel[]) {
    this.tasks.update(curr => [
      ...curr.filter(t => t.listId !== listId || Number(t.priority) !== priority),
      ...newTasks.filter(t => Number(t.priority) === priority).map(t => ({ ...t, listId: listId }))
    ]);
  }

  addTask(listId: number, task: TaskModel) {
    this.tasks.update(curr => [...curr, { ...task, listId }]);
  }

  removeTask(listId: number, id: number) {
    this.tasks.update(curr => curr.filter(t => !(t.id === id && t.listId === listId)));
  }

  updateTask(listId: number, updatedTask: TaskModel, id: number) {
    this.tasks.update(curr =>
      curr.map(t => (t.id === id && t.listId === listId ? { ...t, ...updatedTask } : t))
    );
  }
}
