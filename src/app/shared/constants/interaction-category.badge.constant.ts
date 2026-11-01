import { InteractionCategory } from '../../features/interactions/enums/interaction-category.enum';
import { BadgeVariant } from '../components/badge/badge.component';

export const INTERACTION_CATEGORY_BADGE: Partial<Record<InteractionCategory, BadgeVariant>> = {
  [InteractionCategory.PROPOSAL]: 'inactive',
  [InteractionCategory.CAMPAIGN]: 'purple',
};
