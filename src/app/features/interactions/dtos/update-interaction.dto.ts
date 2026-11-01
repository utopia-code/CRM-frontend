import { InteractionType } from '../enums/interaction-type.enum';

export interface UpdateInteractionDto {
  type?: InteractionType;
  subject?: string;
  notes?: string;
  duration?: number;
  clientId?: number;
  startDate?: string;
}
