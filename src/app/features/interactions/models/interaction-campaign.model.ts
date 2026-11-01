import { CampaignResult } from '../enums/campaign-result.enum';
import { Interaction } from './interaction.model';

export interface InteractionCampaign extends Interaction {
  campaignResult: CampaignResult;
  campaignClientId: number;
}
