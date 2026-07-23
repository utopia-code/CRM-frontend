import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../../layout/components/header/services/header.service';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { EntityItemComponent } from '../../../shared/components/entity-item/entity-item.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { CLIENT_STATUS_BADGE } from '../../../shared/constants/client-status.badge.constant';
import { ClientStatusPipe } from '../../../shared/pipes/client-status.pipe';
import { Client } from '../models/client.model';
import { ClientsService } from '../services/clients.service';

type ClientTab = 'interactions' | 'tasks' | 'proposals';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ClientStatusPipe, EntityItemComponent, IconComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private clientsService = inject(ClientsService);
  private header = inject(HeaderService);
  private router = inject(Router);

  client?: Client;
  activeTab: ClientTab = 'interactions';

  /* Set colors of badge status */
  readonly clientStatusBadge = CLIENT_STATUS_BADGE;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.clientsService.getClient(id).subscribe({
        next: (client) => {
          this.client = client;

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

  editInteraction(id: number) {
    console.log(id);
  }

  openDeleteInteractionModal() {
    console.log();
  }

  editTask(id: number) {
    console.log(id);
  }

  openDeleteTaskModal() {
    console.log();
  }

  editProposal(id: number) {
    console.log(id);
  }

  openDeleteProposalModal() {
    console.log();
  }
}
