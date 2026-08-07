import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TASK_PRIORITY_BADGE } from '../../../shared/constants/task-priority.badge.constant';
import { DueDateStatusPipe } from '../../../shared/pipes/due-date-status.pipe';
import { DueDatePipe } from '../../../shared/pipes/due-date.pipe';
import { ReminderDatePipe } from '../../../shared/pipes/reminder-date.pipe';
import { TaskPriorityPipe } from '../../../shared/pipes/task-priority.pipe';
import { TaskStatusPipe } from '../../../shared/pipes/task-status.pipe';
import { TaskDetail } from '../models/task-detail.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent,
    IconComponent,
    TaskPriorityPipe,
    TaskStatusPipe,
    DueDatePipe,
    ReminderDatePipe,
    DueDateStatusPipe,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  task = input<TaskDetail | null>(null);

  /* Set colors of badge status */
  readonly taskPriorityBadge = TASK_PRIORITY_BADGE;
}
