import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../layout/components/header/services/header.service';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ConfirmModalComponent } from '../../shared/components/modal/confirm-modal/confirm-modal.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { DueDatePipe } from '../../shared/pipes/due-date.pipe';
import { ReminderDatePipe } from '../../shared/pipes/reminder-date.pipe';
import { FormComponent } from '../tasks/actions/form/form.component';
import { TaskStatus } from '../tasks/enums/task-status.enum';
import { TaskList } from '../tasks/models/task-list.model';
import { Task } from '../tasks/models/task.model';
import { TasksService } from '../tasks/services/tasks.service';

interface KanbanColumn {
  status: TaskStatus;
  title: string;
  class: string;
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule,
    DueDatePipe,
    ReminderDatePipe,
    BadgeComponent,
    IconComponent,
    ModalComponent,
    ConfirmModalComponent,
    FormComponent,
  ],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css',
})
export class KanbanComponent implements OnInit {
  readonly TaskStatus = TaskStatus;

  readonly kanbanColumns: KanbanColumn[] = [
    {
      status: TaskStatus.PENDING,
      title: 'Pendente',
      class: 'kanban__status--pending',
    },
    {
      status: TaskStatus.ACTIVE,
      title: 'En curso',
      class: 'kanban__status--active',
    },
    {
      status: TaskStatus.REVIEW,
      title: 'Revisión',
      class: 'kanban__status--review',
    },
    {
      status: TaskStatus.DONE,
      title: 'Completado',
      class: 'kanban__status--done',
    },
  ];

  readonly taskStatuses = [
    TaskStatus.PENDING,
    TaskStatus.ACTIVE,
    TaskStatus.REVIEW,
    TaskStatus.DONE,
  ];

  private header = inject(HeaderService);

  /* Load service of tasks list */
  private tasksService = inject(TasksService);
  tasksList: TaskList[] = [];

  selectedTask: Task | null = null;
  showFormModal = false;

  selectedDeleteTask: TaskList | null = null;
  showDeleteModal = false;

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

    this.tasksService.tasks$.subscribe({
      next: (tasks) => {
        this.tasksList = tasks;
      },
    });

    this.tasksService.getTasksList().subscribe({
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  getTasksByStatus(status: TaskStatus): TaskList[] {
    return this.tasksList.filter((task) => task.status === status);
  }

  /* Obtain number of tasks */
  getTaskCountByStatus(status: TaskStatus): number {
    return this.getTasksByStatus(status).length;
  }

  /* Get all statuses except the current one */
  getAvailableStatuses(currentStatus: TaskStatus): TaskStatus[] {
    return this.taskStatuses.filter((status) => status !== currentStatus);
  }

  /* Change status and column */
  changeTaskStatus(task: TaskList, status: TaskStatus): void {
    if (task.status === status) {
      return;
    }

    this.tasksService.updateTaskStatus(task.id, status).subscribe({
      error: (error) => {
        console.error('Error actualizando status de task:', error);
      },
    });
  }

  /* Edit tasks */
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

  onTaskSaved(): void {
    this.closeModal();
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
