import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderService } from '../../layout/components/header/services/header.service';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { EntityItemComponent } from '../../shared/components/entity-item/entity-item.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ConfirmModalComponent } from '../../shared/components/modal/confirm-modal/confirm-modal.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CLIENT_STATUS_BADGE } from '../../shared/constants/client-status.badge.constant';
import { ClientStatusPipe } from '../../shared/pipes/client-status.pipe';
import { CreateFormComponent } from './actions/form/form.component';
import { ClientList } from './models/client-list.model';
import { Client } from './models/client.model';
import { ClientsService } from './services/clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ClientStatusPipe,
    BadgeComponent,
    EntityItemComponent,
    IconComponent,
    ModalComponent,
    CreateFormComponent,
    RouterLink,
    ConfirmModalComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  selectedClient: Client | null = null;
  showClientModal = false;

  selectedDeleteClient: ClientList | null = null;
  showDeleteModal = false;

  private header = inject(HeaderService);
  private router = inject(Router);

  /* Load service of clients list */
  private clientsService = inject(ClientsService);
  clientsList: ClientList[] = [];

  /* Set colors of badge status */
  readonly clientStatusBadge = CLIENT_STATUS_BADGE;

  /* Init view clients list */
  ngOnInit(): void {
    this.header.set({
      title: 'Clientes',
      actions: [
        {
          label: 'Nuevo cliente',
          icon: 'plus',
          action: () => this.openCreateModal(),
        },
      ],
    });
    this.loadClientsList();
  }

  loadClientsList(): void {
    this.clientsService.getClientsList().subscribe({
      next: (data: ClientList[]) => {
        console.log('DATA: ', data);
        this.clientsList = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  getMainContact(client: ClientList) {
    return client.contacts?.[0];
  }

  /* Open and close modal */
  openCreateModal() {
    this.selectedClient = null;
    this.showClientModal = true;
  }

  /* Edit client */
  editClient(id: number): void {
    this.clientsService.getClient(id).subscribe({
      next: (client) => {
        this.selectedClient = client;
        this.showClientModal = true;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  closeModal() {
    this.showClientModal = false;
  }

  onClientSaved() {
    this.closeModal();
    this.loadClientsList();
  }

  /* Delete client */
  openDeleteModal(client: ClientList): void {
    this.selectedDeleteClient = client;
    this.showDeleteModal = true;
  }

  confirmDeleteClient() {
    if (!this.selectedDeleteClient) {
      return;
    }

    const clientId = this.selectedDeleteClient.id;

    this.clientsService.removeClient(clientId).subscribe({
      next: () => {
        // Update list
        this.clientsList = this.clientsList.filter((item) => item.id !== clientId);

        this.closeDeleteModal();
      },
      error: console.error,
    });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedDeleteClient = null;
  }
}
