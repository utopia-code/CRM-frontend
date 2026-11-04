import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ConfirmModalComponent } from '../../../../shared/components/modal/confirm-modal/confirm-modal.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { TASK_PRIORITY_BADGE } from '../../../../shared/constants/task-priority.badge.constant';
import { DueDateStatusPipe } from '../../../../shared/pipes/due-date-status.pipe';
import { DueDatePipe } from '../../../../shared/pipes/due-date.pipe';
import { ReminderDatePipe } from '../../../../shared/pipes/reminder-date.pipe';
import { TaskPriorityPipe } from '../../../../shared/pipes/task-priority.pipe';
import { FormComponent } from '../../actions/form/form.component';
import { DetailComponent } from '../../detail/detail.component';
import { TaskStatus } from '../../enums/task-status.enum';
import { TaskDetail } from '../../models/task-detail.model';
import { TaskList } from '../../models/task-list.model';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-client-tasks',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent,
    TaskPriorityPipe,
    DueDateStatusPipe,
    IconComponent,
    DueDatePipe,
    ReminderDatePipe,
    ModalComponent,
    DetailComponent,
    ConfirmModalComponent,
    FormComponent,
  ],
  templateUrl: './client-tasks.component.html',
  styleUrl: './client-tasks.component.css',
})
export class ClientTasksComponent implements OnInit, OnChanges, OnDestroy {
  clientId = input.required<number>();

  private tasksService = inject(TasksService);
  private subscriptions = new Subscription();

  tasksList: TaskList[] = [];
  loading = false;
  error = false;

  selectedTask: Task | null = null;
  showFormModal = false;

  selectedDeleteTask: TaskList | null = null;
  showDeleteModal = false;

  selectedDetailTask: TaskDetail | null = null;
  showDetailModal = false;

  /* Set colors of badge status */
  readonly taskPriorityBadge = TASK_PRIORITY_BADGE;

  /* Save Task status before change to DONE */
  private previousStatuses = new Map<number, TaskStatus>();

  ngOnInit(): void {
    this.subscriptions.add(
      this.tasksService.tasks$.subscribe((tasks) => {
        this.tasksList = tasks;
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId']) {
      this.loadTasks(this.clientId());
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadTasks(clientId: number): void {
    this.loading = true;
    this.error = false;

    this.tasksService.getTasksListByClient(clientId).subscribe({
      next: (data: TaskList[]) => {
        this.tasksList = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading tasks:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  /* Change status Task to DONE */
  toggleDone(task: TaskList): void {
    const previousStatus =
      task.status !== TaskStatus.DONE
        ? task.status
        : (this.previousStatuses.get(task.id) ?? TaskStatus.PENDING);

    const newStatus = task.status === TaskStatus.DONE ? previousStatus : TaskStatus.DONE;

    if (task.status !== TaskStatus.DONE) {
      this.previousStatuses.set(task.id, task.status);
    }

    this.tasksService.updateTaskStatus(task.id, newStatus).subscribe({
      next: () => {
        if (newStatus !== TaskStatus.DONE) {
          this.previousStatuses.delete(task.id);
        }
      },
      error: (error) => {
        console.error('Error updating task status:', error);
      },
    });
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

  onTaskSaved(): void {
    this.closeModal();
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

  /* Delete task */
  openDeleteTaskModal(task: TaskList): void {
    this.selectedDeleteTask = task;
    this.showDeleteModal = true;
  }
}
