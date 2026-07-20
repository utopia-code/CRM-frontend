import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { CLIENT_STATUS_BADGE } from '../../../shared/constants/client-status.badge.constant';
import { ClientStatusPipe } from '../../../shared/pipes/client-status.pipe';
import { Client } from '../models/client.model';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ClientStatusPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private clientsService = inject(ClientsService);

  client?: Client;

  /* Set colors of badge status */
  readonly clientStatusBadge = CLIENT_STATUS_BADGE;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      this.clientsService.getClient(id).subscribe({
        next: (client) => (this.client = client),
        error: console.error,
      });
    });
  }
}
