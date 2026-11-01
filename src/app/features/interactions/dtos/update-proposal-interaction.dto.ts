import { ProposalStatus } from '../enums/proposal-status.enum';
import { UpdateInteractionDto } from './update-interaction.dto';

export interface UpdateProposalInteractionDto extends UpdateInteractionDto {
  amount?: number;
  proposalStatus?: ProposalStatus;
  showId?: number;
}
