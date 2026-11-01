import { InteractionType } from '../enums/interaction-type.enum';

export interface CreateInteractionDto {
  type: InteractionType;
  subject: string;
  notes?: string;
  duration?: number;
  clientId: number;
  startDate: string;
}
