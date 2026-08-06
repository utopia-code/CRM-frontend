import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TaskDetail } from '../models/task-detail.model';
import { TaskList } from '../models/task-list.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private api = `${environment.api}/tasks`;

  getTasksList(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${this.api}/list`);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  getTaskDetail(id: number): Observable<TaskDetail> {
    return this.http.get<TaskDetail>(`${this.api}/${id}`);
  }
}
