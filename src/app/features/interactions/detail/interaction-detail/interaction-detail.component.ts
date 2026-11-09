import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { INTERACTION_CATEGORY_BADGE } from '../../../../shared/constants/interaction-category.badge.constant';
import { INTERACTION_TYPE_BADGE } from '../../../../shared/constants/interaction-type.badge.constant';
import { InteractionTypePipe } from '../../../../shared/pipes/interaction-type.pipe';
import { InteractionCategory } from '../../enums/interaction-category.enum';
import { Interaction } from '../../models/interaction.model';

@Component({
  selector: 'app-interaction-detail',
  standalone: true,
  imports: [CommonModule, BadgeComponent, InteractionTypePipe],
  templateUrl: './interaction-detail.component.html',
  styleUrl: './interaction-detail.component.css',
})
export class InteractionDetailComponent {
  interaction = input<Interaction | null>(null);

  readonly interactionTypeBadge = INTERACTION_TYPE_BADGE;
  readonly interactionCategoryBadge = INTERACTION_CATEGORY_BADGE;

  getInteractionBadgeText(category: string): string {
    switch (category) {
      case InteractionCategory.PROPOSAL:
        return 'Proposta';

      case InteractionCategory.CAMPAIGN:
        return 'Campaña';

      case InteractionCategory.GENERAL:
        return 'General';

      default:
        return '';
    }
  }
}
