import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RecentInteractions } from '../models/recent-interactions.model';
import { RecentTasks } from '../models/recent-tasks.model';
import { WeeklyInteractionSummary } from '../models/weekly-interaction-summary.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private api = `${environment.api}`;

  // SHOW RECENT TASKS
  getRecentTasks(): Observable<RecentTasks[]> {
    return this.http.get<RecentTasks[]>(`${this.api}/tasks/recent`);
  }

  // SHOW RECENT INTERACTIONS
  getRecentInteractions(): Observable<RecentInteractions[]> {
    return this.http.get<RecentInteractions[]>(`${this.api}/interactions/recent`);
  }

  getWeeklyInteractionsSummary(): Observable<WeeklyInteractionSummary> {
    return this.http.get<WeeklyInteractionSummary>(`${this.api}/interactions/summary-weekly`);
  }
}
