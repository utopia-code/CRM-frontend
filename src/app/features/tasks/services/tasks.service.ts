import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DeleteResponse } from '../../../core/modals/delete-response';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TaskDetail } from '../models/task-detail.model';
import { TaskList } from '../models/task-list.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private api = `${environment.api}/tasks`;

  // SHOW TASK LIST
  getTasksList(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${this.api}/list`);
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
    return this.http.post<Task>(this.api, task);
  }

  // EDIT TASK
  updateTask(id: number, taskData: UpdateTaskDto): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, taskData);
  }

  // DELETE TASK
  removeTask(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.api}/${id}`);
  }
}
