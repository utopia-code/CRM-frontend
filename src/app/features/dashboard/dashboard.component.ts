import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../layout/components/header/services/header.service';
import { BadgeComponent, BadgeVariant } from '../../shared/components/badge/badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { INTERACTION_CATEGORY_BADGE } from '../../shared/constants/interaction-category.badge.constant';
import { INTERACTION_TYPE_BADGE } from '../../shared/constants/interaction-type.badge.constant';
import { TASK_STATUS_BADGE } from '../../shared/constants/task-status.badge.constant';
import { DueDateStatusPipe } from '../../shared/pipes/due-date-status.pipe';
import { DueDatePipe } from '../../shared/pipes/due-date.pipe';
import { InteractionTypePipe } from '../../shared/pipes/interaction-type.pipe';
import { TaskStatusPipe } from '../../shared/pipes/task-status.pipe';
import { InteractionCategory } from '../interactions/enums/interaction-category.enum';
import { DetailComponent } from '../tasks/detail/detail.component';
import { TaskDetail } from '../tasks/models/task-detail.model';
import { TasksService } from '../tasks/services/tasks.service';
import { RecentInteractions } from './models/recent-interactions.model';
import { RecentTasks } from './models/recent-tasks.model';
import { WeeklyInteractionSummary } from './models/weekly-interaction-summary.model';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TaskStatusPipe,
    DueDatePipe,
    DueDateStatusPipe,
    BadgeComponent,
    IconComponent,
    DetailComponent,
    ModalComponent,
    InteractionTypePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private tasksService = inject(TasksService);
  private header = inject(HeaderService);
  private router = inject(Router);

  tasks: RecentTasks[] = [];
  loadingTasks = true;
  errorTasks = false;

  interactions: RecentInteractions[] = [];
  loadingInteractions = true;
  errorInteractions = false;

  weeklyInteractions: WeeklyInteractionSummary | null = null;
  loadingWeeklyInteractions = true;
  errorWeeklyInteractions = false;

  selectedDetailTask: TaskDetail | null = null;
  showDetailModal = false;

  /* Set colors of badge task status */
  readonly taskStatusBadge = TASK_STATUS_BADGE;

  /* Set colors of badge interaction type and category */
  readonly interactionTypeBadge = INTERACTION_TYPE_BADGE;
  readonly interactionCategoryBadge = INTERACTION_CATEGORY_BADGE;

  ngOnInit(): void {
    this.header.set({
      title: 'Panel de control',
      actions: [],
    });

    this.dashboardService.getRecentTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loadingTasks = false;

        this.errorTasks = false;
      },
      error: (err) => {
        console.error('Status:', err.status);
        console.error('Respuesta del backend:', err.error);
        console.error('Mensaje:', err.error?.message);
        this.errorTasks = true;
        this.loadingTasks = false;
      },
    });

    this.dashboardService.getRecentInteractions().subscribe({
      next: (interactions) => {
        this.interactions = interactions;
        this.loadingInteractions = false;
        this.errorInteractions = false;
      },
      error: (err) => {
        console.error('Status:', err.status);
        console.error('Respuesta del backend:', err.error);
        console.error('Mensaje:', err.error?.message);

        this.errorInteractions = true;
        this.loadingInteractions = false;
      },
    });

    this.dashboardService.getWeeklyInteractionsSummary().subscribe({
      next: (summary) => {
        console.log('RESUMEN SEMANAL RECIBIDO:', summary);

        this.weeklyInteractions = summary;
        this.loadingWeeklyInteractions = false;
        this.errorWeeklyInteractions = false;
      },
      error: (err) => {
        console.error('Error: ', err.error?.message);

        this.errorWeeklyInteractions = true;
        this.loadingWeeklyInteractions = false;
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

  getInteractionBadgeText(interaction: RecentInteractions): string | null {
    switch (interaction.category) {
      case InteractionCategory.PROPOSAL:
        return 'Proposta';

      case InteractionCategory.CAMPAIGN:
        return 'Campaña';

      default:
        return null;
    }
  }

  getInteractionBadgeVariant(interaction: RecentInteractions): BadgeVariant {
    return (
      this.interactionCategoryBadge[interaction.category] ??
      this.interactionTypeBadge[interaction.type]
    );
  }

  openTask(id: number): void {
    this.router.navigate(['/tasks', id]);
  }

  openAllTasks(): void {
    this.router.navigate(['/tasks']);
  }

  openClientInteraction(clientId: number): void {
    this.router.navigate(['/clients', clientId]);
  }

  openAllClients(): void {
    this.router.navigate(['/clients']);
  }
}
