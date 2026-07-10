import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../layout/components/header/services/header.service';
import { BadgeComponent, BadgeVariant } from '../../shared/components/badge/badge.component';
import { EntityItemComponent } from '../../shared/components/entity-item/entity-item.component';
import { ClientStatusPipe } from '../../shared/pipes/client-status.pipe';
import { ClientStatus } from './enums/clientStatus.enum';
import { ClientList } from './models/client-list.dto';
import { ClientsService } from './services/clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, ClientStatusPipe, BadgeComponent, EntityItemComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  private header = inject(HeaderService);

  clientsList: ClientList[] = [];

  readonly clientStatusBadge: Record<ClientStatus, BadgeVariant> = {
    [ClientStatus.POTENTIAL]: 'bg',
    [ClientStatus.ACTIVE]: 'active',
    [ClientStatus.INACTIVE]: 'inactive',
  };

  private clientsService = inject(ClientsService);

  ngOnInit(): void {
    this.header.set({
      title: 'Clientes',
      actions: [
        {
          label: 'Nuevo cliente',
          icon: 'plus',
          action: () => this.createClient(),
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

  createClient() {
    console.log('create client');
  }
}
