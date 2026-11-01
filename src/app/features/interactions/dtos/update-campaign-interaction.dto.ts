import { CampaignResult } from '../enums/campaign-result.enum';
import { UpdateInteractionDto } from './update-interaction.dto';

export interface UpdateCampaignInteractionDto extends UpdateInteractionDto {
  campaignResult?: CampaignResult;
  campaignClientId?: number;
}
