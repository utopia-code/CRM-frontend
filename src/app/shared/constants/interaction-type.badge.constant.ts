import { InteractionType } from '../../features/interactions/enums/interaction-type.enum';
import { BadgeVariant } from '../components/badge/badge.component';

export const INTERACTION_TYPE_BADGE: Record<InteractionType, BadgeVariant> = {
  [InteractionType.CALL]: 'bg',
  [InteractionType.EMAIL]: 'active',
  [InteractionType.MEETING]: 'notice',
};
