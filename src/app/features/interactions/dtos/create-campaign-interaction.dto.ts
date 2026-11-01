import { CampaignResult } from '../enums/campaign-result.enum';
import { CreateInteractionDto } from './create-interaction.dto';

export interface CreateCampaignInteractionDto extends CreateInteractionDto {
  campaignResult: CampaignResult;
  campaignClientId: number;
}
