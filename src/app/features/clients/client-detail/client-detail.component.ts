import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../../layout/components/header/services/header.service';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { EntityItemComponent } from '../../../shared/components/entity-item/entity-item.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ConfirmModalComponent } from '../../../shared/components/modal/confirm-modal/confirm-modal.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CLIENT_STATUS_BADGE } from '../../../shared/constants/client-status.badge.constant';
import { TASK_PRIORITY_BADGE } from '../../../shared/constants/task-priority.badge.constant';
import { ClientStatusPipe } from '../../../shared/pipes/client-status.pipe';
import { DueDateStatusPipe } from '../../../shared/pipes/due-date-status.pipe';
import { DueDatePipe } from '../../../shared/pipes/due-date.pipe';
import { ReminderDatePipe } from '../../../shared/pipes/reminder-date.pipe';
import { TaskPriorityPipe } from '../../../shared/pipes/task-priority.pipe';
import { FormComponent } from '../../tasks/actions/form/form.component';
import { DetailComponent } from '../../tasks/detail/detail.component';
import { TaskStatus } from '../../tasks/enums/task-status.enum';
import { TaskDetail } from '../../tasks/models/task-detail.model';
import { TaskList } from '../../tasks/models/task-list.model';
import { Task } from '../../tasks/models/task.model';
import { TasksService } from '../../tasks/services/tasks.service';
import { Client } from '../models/client.model';
import { ClientsService } from '../services/clients.service';

type ClientTab = 'interactions' | 'tasks' | 'proposals';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent,
    ClientStatusPipe,
    EntityItemComponent,
    IconComponent,
    TaskPriorityPipe,
    DueDatePipe,
    DueDateStatusPipe,
    ReminderDatePipe,
    ModalComponent,
    ConfirmModalComponent,
    FormComponent,
    DetailComponent,
  ],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css',
})
export class ClientDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private clientsService = inject(ClientsService);
  private header = inject(HeaderService);
  private router = inject(Router);

  client?: Client;
  activeTab: ClientTab = 'interactions';

  /* Set colors of badge status */
  readonly clientStatusBadge = CLIENT_STATUS_BADGE;

  private tasksService = inject(TasksService);
  tasksList: TaskList[] = [];

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
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.clientsService.getClient(id).subscribe({
        next: (client) => {
          this.client = client;

          /* Load tasks of this client */
          this.loadTasks(client.id);

          this.header.set({
            title: client.organization,
            actions: [
              {
                label: 'Volver a clientes',
                icon: 'back',
                action: () => this.gotToClients(),
              },
            ],
          });
        },
        error: console.error,
      });
    });
  }

  changeTab(tab: ClientTab): void {
    this.activeTab = tab;
  }

  gotToClients() {
    this.router.navigate(['/clients']);
  }

  loadTasks(idClient: number): void {
    this.tasksService.getTasksListByClient(idClient).subscribe({
      next: (data: TaskList[]) => {
        console.log('DATA: ', data);
        this.tasksList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
  openDeleteModal(task: TaskList): void {
    this.selectedDeleteTask = task;
    this.showDeleteModal = true;
  }

  /* Interactions */
  editInteraction(id: number): void {
    console.log('edit interaction', id);
  }

  openDeleteInteractionModal(): void {
    console.log('delete interaction');
  }

  /* Proposals */
  editProposal(id: number): void {
    console.log('edit proposal', id);
  }

  openDeleteProposalModal(): void {
    console.log('delete interaction');
  }
}
