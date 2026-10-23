import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../layout/components/header/services/header.service';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { DueDateStatusPipe } from '../../shared/pipes/due-date-status.pipe';
import { DueDatePipe } from '../../shared/pipes/due-date.pipe';
import { DetailComponent } from '../tasks/detail/detail.component';
import { TaskDetail } from '../tasks/models/task-detail.model';
import { TasksService } from '../tasks/services/tasks.service';
import { RecentTask } from './models/recent-task.model';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DueDatePipe,
    DueDateStatusPipe,
    BadgeComponent,
    IconComponent,
    DetailComponent,
    ModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private tasksService = inject(TasksService);
  private header = inject(HeaderService);
  private router = inject(Router);

  tasks: RecentTask[] = [];
  loading = true;
  error = false;

  selectedDetailTask: TaskDetail | null = null;
  showDetailModal = false;

  ngOnInit(): void {
    this.header.set({
      title: 'Panel de control',
      actions: [],
    });

    this.dashboardService.getRecentTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;

        this.error = false;
      },
      error: (err) => {
        console.error('Status:', err.status);
        console.error('Respuesta del backend:', err.error);
        console.error('Mensaje:', err.error?.message);
        this.error = true;
        this.loading = false;
      },
    });
  }

  openTaskDetail(id: number): void {
    this.selectedDetailTask = null;

    this.tasksService.getTaskDetail(id).subscribe({
      next: (task) => {
        this.selectedDetailTask = task;
        this.showDetailModal = true;
      },
      error: (error) => {
        console.error('Error al obtener el detalle de la tarea:', error);
      },
    });
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedDetailTask = null;
  }

  openTask(id: number): void {
    this.router.navigate(['/tasks', id]);
  }

  openAllTasks(): void {
    this.router.navigate(['/tasks']);
  }
}
