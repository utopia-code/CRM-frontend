import { ProposalStatus } from '../enums/proposal-status.enum';
import { Interaction } from './interaction.model';

export interface InteractionProposal extends Interaction {
  amount: number | null;
  proposalStatus: ProposalStatus;
  showId: number | null;
  showName: string | null;
}

export interface ClientProposalsResponseDto {
  organization: string;
  proposals: InteractionProposal[];
}
