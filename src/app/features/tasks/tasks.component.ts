import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../layout/components/header/services/header.service';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ConfirmModalComponent } from '../../shared/components/modal/confirm-modal/confirm-modal.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TASK_PRIORITY_BADGE } from '../../shared/constants/task-priority.badge.constant';
import { DueDateStatusPipe } from '../../shared/pipes/due-date-status.pipe';
import { DueDatePipe } from '../../shared/pipes/due-date.pipe';
import { ReminderDatePipe } from '../../shared/pipes/reminder-date.pipe';
import { TaskPriorityPipe } from '../../shared/pipes/task-priority.pipe';
import { DetailComponent } from './detail/detail.component';
import { TaskPriority } from './enums/task-priority.enum';
import { TaskStatus } from './enums/task-status.enum';
import { TaskDetail } from './models/task-detail.model';
import { TaskList } from './models/task-list.model';
import { Task } from './models/task.model';
import { TasksService } from './services/tasks.service';

type TaskTab = 'all' | 'active' | 'completed';
type SortField = 'priority' | 'endDate' | 'reminderDate';
type SortDirection = 'asc' | 'desc';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    TaskPriorityPipe,
    DueDatePipe,
    DueDateStatusPipe,
    ReminderDatePipe,
    BadgeComponent,
    IconComponent,
    ModalComponent,
    ConfirmModalComponent,
    DetailComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  selectedTask: Task | null = null;
  showFormModal = false;

  selectedDeleteTask: TaskList | null = null;
  showDeleteModal = false;

  selectedDetailTask: TaskDetail | null = null;
  showDetailModal = false;

  private header = inject(HeaderService);

  /* Load service of tasks list */
  private tasksService = inject(TasksService);
  tasksList: TaskList[] = [];

  /* Set colors of badge status */
  readonly taskPriorityBadge = TASK_PRIORITY_BADGE;

  /* Tab active: all as init */
  activeTab: TaskTab = 'all';

  readonly activeStatus = [TaskStatus.PENDING, TaskStatus.ACTIVE, TaskStatus.REVIEW];

  /* Sort filters and directions */

  sortField: SortField = 'endDate';
  sortDirection: SortDirection = 'asc';

  private priorityValue(priority: TaskPriority): number {
    const order = {
      [TaskPriority.LOW]: 3,
      [TaskPriority.MEDIUM]: 2,
      [TaskPriority.HIGH]: 1,
    };

    return priority ? order[priority] : 0;
  }

  /* Init view tasks list */
  ngOnInit(): void {
    this.header.set({
      title: 'Tarefas',
      actions: [
        {
          label: 'Nova tarefa',
          icon: 'plus',
          action: () => this.openFormModal(),
        },
      ],
    });
    this.loadTasksList();
  }

  loadTasksList(): void {
    this.tasksService.getTasksList().subscribe({
      next: (data: TaskList[]) => {
        console.log('DATA: ', data);
        this.tasksList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  /* Change tab and get filtered content */
  changeTab(tab: TaskTab): void {
    this.activeTab = tab;
  }

  get filteredTasks(): TaskList[] {
    switch (this.activeTab) {
      case 'active':
        return this.tasksList.filter((task) => this.activeStatus.includes(task.status));

      case 'completed':
        return this.tasksList.filter((task) => task.status === TaskStatus.DONE);

      default:
        return this.tasksList;
    }
  }

  /* Change sort and direction */
  changeSort(field: SortField): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  get sortedTasks(): TaskList[] {
    const tasks = [...this.filteredTasks];

    return tasks.sort((a, b) => {
      let result = 0;

      switch (this.sortField) {
        case 'priority':
          result = this.priorityValue(a.priority) - this.priorityValue(b.priority);
          break;

        case 'endDate':
          result = this.compareDates(a.endDate, b.endDate);
          break;

        case 'reminderDate':
          result = this.compareDates(a.reminderDate, b.reminderDate);
          break;
      }

      return this.sortDirection === 'asc' ? result : -result;
    });
  }

  private compareDates(
    dateA: Date | string | null | undefined,
    dateB: Date | string | null | undefined,
  ): number {
    if (!dateA && !dateB) {
      return 0;
    }

    // Sin fecha siempre al final
    if (!dateA) {
      return 1;
    }

    if (!dateB) {
      return -1;
    }

    return new Date(dateA).getTime() - new Date(dateB).getTime();
  }

  /* Change status Task to DONE */
  toggleDone(task: Task) {
    if (task.status !== TaskStatus.DONE) {
      task.status = TaskStatus.DONE;
    }
  }

  /* Edit task */
  editTask(id: number): void {
    this.tasksService.getTask(id).subscribe({
      next: (task) => {
        this.selectedTask = task;
        this.showFormModal = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /* Open and close form modal */
  openFormModal() {
    this.selectedTask = null;
    this.showFormModal = true;
  }

  closeModal() {
    this.showFormModal = false;
  }

  /* Open detail modal */
  openTaskDetail(id: number) {
    this.selectedDetailTask = null;

    this.tasksService.getTaskDetail(id).subscribe({
      next: (task) => {
        this.selectedDetailTask = task;
        this.showDetailModal = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  closeDetailModal() {
    this.showDetailModal = false;
  }

  /* Delete task */
  openDeleteModal(task: TaskList): void {
    this.selectedDeleteTask = task;
    this.showDeleteModal = true;
  }

  confirmDeleteTask() {
    if (!this.selectedDeleteTask) {
      return;
    }

    const taskId = this.selectedDeleteTask.id;

    this.tasksService.removeTask(taskId).subscribe({
      next: () => {
        // Update list
        this.tasksList = this.tasksList.filter((item) => item.id !== taskId);

        this.closeDeleteModal();
      },
      error: console.error,
    });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedDeleteTask = null;
  }
}
