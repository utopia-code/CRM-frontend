import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { INTERACTION_CATEGORY_BADGE } from '../../../../shared/constants/interaction-category.badge.constant';
import { INTERACTION_TYPE_BADGE } from '../../../../shared/constants/interaction-type.badge.constant';
import { PROPOSAL_STATUS_BADGE } from '../../../../shared/constants/proposal-status.badge.constant';
import { InteractionTypePipe } from '../../../../shared/pipes/interaction-type.pipe';
import { ProposalStatusPipe } from '../../../../shared/pipes/proposal-status.pipe';
import { InteractionProposal } from '../../models/interaction-proposal.model';

@Component({
  selector: 'app-proposal-detail',
  standalone: true,
  imports: [CommonModule, BadgeComponent, ProposalStatusPipe, InteractionTypePipe],
  templateUrl: './proposal-detail.component.html',
  styleUrl: './proposal-detail.component.css',
})
export class ProposalDetailComponent {
  proposal = input<InteractionProposal | null>(null);

  readonly interactionTypeBadge = INTERACTION_TYPE_BADGE;
  readonly interactionCategoryBadge = INTERACTION_CATEGORY_BADGE;

  readonly proposalStatusBadge = PROPOSAL_STATUS_BADGE;
}
