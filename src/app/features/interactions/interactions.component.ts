import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { INTERACTION_CATEGORY_BADGE } from '../../shared/constants/interaction-category.badge.constant';
import { INTERACTION_TYPE_BADGE } from '../../shared/constants/interaction-type.badge.constant';
import { InteractionTypePipe } from '../../shared/pipes/interaction-type.pipe';
import { InteractionCategory } from './enums/interaction-category.enum';
import { Interaction } from './models/interaction.model';
import { InteractionsService } from './services/interactions.service';

@Component({
  selector: 'app-interactions',
  standalone: true,
  imports: [CommonModule, BadgeComponent, InteractionTypePipe, IconComponent],
  templateUrl: './interactions.component.html',
  styleUrl: './interactions.component.css',
})
export class InteractionsComponent implements OnChanges {
  clientId = input.required<number>();

  private interactionsService = inject(InteractionsService);

  interactionsList: Interaction[] = [];
  loading = false;
  error = false;

  readonly interactionTypeBadge = INTERACTION_TYPE_BADGE;
  readonly interactionCategoryBadge = INTERACTION_CATEGORY_BADGE;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId']) {
      this.loadInteractions(this.clientId());
    }
  }

  loadInteractions(clientId: number): void {
    this.loading = true;
    this.error = false;

    this.interactionsService.getInteractionsListByClient(clientId).subscribe({
      next: (data: Interaction[]) => {
        this.interactionsList = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading interactions:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  getInteractionBadgeText(interaction: Interaction): string {
    switch (interaction.category) {
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

  editInteraction(id: number): void {
    console.log('edit interaction', id);
  }

  openDeleteInteractionModal(id: number): void {
    console.log('delete interaction', id);
  }
}
