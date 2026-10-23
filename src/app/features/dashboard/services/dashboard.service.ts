import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RecentTask } from '../models/recent-task.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private api = `${environment.api}`;

  // SHOW RECENT TASKS
  getRecentTasks(): Observable<RecentTask[]> {
    return this.http.get<RecentTask[]>(`${this.api}/tasks/recent`);
  }
}
