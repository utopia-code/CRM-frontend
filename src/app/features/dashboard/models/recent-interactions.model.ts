import { InteractionCategory } from '../../interactions/enums/interaction-category.enum';
import { InteractionType } from '../../interactions/enums/interaction-type.enum';

export interface RecentInteractions {
  id: number;
  type: InteractionType;
  subject: string;
  category: InteractionCategory;
  startDate: Date;
  organization: string | null;
  clientId: number;
}
