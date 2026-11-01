import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { INTERACTION_TYPE_BADGE } from '../../../shared/constants/interaction-type.badge.constant';
import { PROPOSAL_STATUS_BADGE } from '../../../shared/constants/proposal-status.badge.constant';
import { InteractionTypePipe } from '../../../shared/pipes/interaction-type.pipe';
import { ProposalStatusPipe } from '../../../shared/pipes/proposal-status.pipe';
import { InteractionProposal } from '../models/interaction-proposal.model';
import { InteractionsService } from '../services/interactions.service';

@Component({
  selector: 'app-proposal',
  standalone: true,
  imports: [CommonModule, BadgeComponent, IconComponent, ProposalStatusPipe, InteractionTypePipe],
  templateUrl: './proposal.component.html',
  styleUrl: './proposal.component.css',
})
export class ProposalComponent implements OnChanges {
  clientId = input.required<number>();

  private interactionsService = inject(InteractionsService);

  interactionsProposalList: InteractionProposal[] = [];
  loading = false;
  error = false;

  readonly interactionTypeBadge = INTERACTION_TYPE_BADGE;
  readonly proposalStatusBadge = PROPOSAL_STATUS_BADGE;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId']) {
      this.loadProposals(this.clientId());
    }
  }

  loadProposals(clientId: number): void {
    this.loading = true;
    this.error = false;

    this.interactionsService.getInteractionsProposalListByClient(clientId).subscribe({
      next: (data: InteractionProposal[]) => {
        this.interactionsProposalList = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading interactions proposal:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  editProposal(id: number): void {
    console.log('edit interaction', id);
  }

  openDeleteProposalModal(id: number): void {
    console.log('delete interaction', id);
  }
}
