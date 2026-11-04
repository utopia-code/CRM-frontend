import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../../layout/components/header/services/header.service';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { EntityItemComponent } from '../../../shared/components/entity-item/entity-item.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CLIENT_STATUS_BADGE } from '../../../shared/constants/client-status.badge.constant';
import { ClientStatusPipe } from '../../../shared/pipes/client-status.pipe';
import { InteractionsComponent } from '../../interactions/interactions.component';
import { ProposalComponent } from '../../interactions/proposal/proposal.component';
import { ClientTasksComponent } from '../../tasks/components/client-tasks/client-tasks.component';
import { TaskStatus } from '../../tasks/enums/task-status.enum';
import { TaskList } from '../../tasks/models/task-list.model';
import { TasksService } from '../../tasks/services/tasks.service';
import { ClientDetail } from '../models/client-detail.model';
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
    InteractionsComponent,
    ProposalComponent,
    ClientTasksComponent,
  ],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css',
})
export class ClientDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private clientsService = inject(ClientsService);
  private header = inject(HeaderService);
  private router = inject(Router);
  private tasksService = inject(TasksService);

  private subscriptions = new Subscription();

  private currentClientId: number | null = null;
  client?: ClientDetail;
  activeTab: ClientTab = 'interactions';

  /* Set colors of badge status */
  readonly clientStatusBadge = CLIENT_STATUS_BADGE;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.clientsService.getClient(id).subscribe({
        next: (client) => {
          console.log('CLIENT:', client);
          this.client = client;
          this.currentClientId = client.id;

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

    this.subscriptions.add(
      this.tasksService.tasks$.subscribe((tasks) => {
        if (this.currentClientId === null) return;

        this.updateTaskSummary(tasks);
      }),
    );
  }

  changeTab(tab: ClientTab): void {
    this.activeTab = tab;
  }

  gotToClients() {
    this.router.navigate(['/clients']);
  }

  /* Update Task Summary if Task Status change */
  private updateTaskSummary(tasks: TaskList[]): void {
    if (!this.client) return;

    this.client = {
      ...this.client,
      summary: {
        ...this.client.summary,
        completedTasks: tasks.filter((task) => task.status === TaskStatus.DONE).length,

        pendingTasks: tasks.filter((task) => task.status !== TaskStatus.DONE).length,
      },
    };
  }

  /* Proposals */
  editProposal(id: number): void {
    console.log('edit proposal', id);
  }

  openDeleteProposalModal(): void {
    console.log('delete interaction');
  }
}
