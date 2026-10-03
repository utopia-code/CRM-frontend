import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DeleteResponse } from '../../../core/modals/delete-response';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { ClientTask } from '../models/client-task.model';
import { TaskDetail } from '../models/task-detail.model';
import { TaskList } from '../models/task-list.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private api = `${environment.api}/tasks`;

  private tasksSubject = new BehaviorSubject<TaskList[]>([]);
  readonly tasks$ = this.tasksSubject.asObservable();

  private refreshTasksList(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${this.api}/list`).pipe(
      tap((tasks) => {
        this.tasksSubject.next(tasks);
      }),
    );
  }

  private mapClientTaskToTaskList(task: ClientTask): TaskList {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      client: task.client,
      endDate: task.scheduleEntry?.endDate ?? null,
      reminderDate: task.scheduleEntry?.reminderDate ?? null,
    };
  }

  // SHOW TASK LIST
  getTasksList(): Observable<TaskList[]> {
    return this.refreshTasksList();
  }

  // SHOW TASKs LIST BY CLIENT
  getTasksListByClient(id: number): Observable<TaskList[]> {
    return this.http.get<ClientTask[]>(`${this.api}/client/${id}`).pipe(
      map((tasks) => tasks.map((task) => this.mapClientTaskToTaskList(task))),
      tap((tasks) => {
        this.tasksSubject.next(tasks);
      }),
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  // SHOW TASK DETAIL
  getTaskDetail(id: number): Observable<TaskDetail> {
    return this.http.get<TaskDetail>(`${this.api}/${id}`);
  }

  // CREATE TASK
  createTask(task: CreateTaskDto): Observable<Task> {
    return this.http
      .post<Task>(this.api, task)
      .pipe(switchMap((createdTask) => this.refreshTasksList().pipe(map(() => createdTask))));
  }

  // EDIT TASK
  updateTask(id: number, taskData: UpdateTaskDto): Observable<Task> {
    return this.http
      .patch<Task>(`${this.api}/${id}`, taskData)
      .pipe(switchMap((updatedTask) => this.refreshTasksList().pipe(map(() => updatedTask))));
  }

  // DELETE TASK
  removeTask(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.api}/${id}`).pipe(
      tap(() => {
        const updatedTasks = this.tasksSubject.value.filter((task) => task.id !== id);
        this.tasksSubject.next(updatedTasks);
      }),
    );
  }

  // UPDATE TASK STATUS
  updateTaskStatus(id: number, status: TaskStatus): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}/status`, { status }).pipe(
      tap((updatedTask) => {
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.map((task) =>
          task.id === updatedTask.id
            ? {
                ...task,
                status: updatedTask.status,
              }
            : task,
        );
        this.tasksSubject.next(updatedTasks);
      }),
    );
  }
}
