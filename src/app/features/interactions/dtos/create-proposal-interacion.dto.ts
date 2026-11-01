import { ProposalStatus } from '../enums/proposal-status.enum';
import { CreateInteractionDto } from './create-interaction.dto';

export interface CreateProposalInteractionDto extends CreateInteractionDto {
  amount?: number;
  proposalStatus: ProposalStatus;
  showId?: number;
}
