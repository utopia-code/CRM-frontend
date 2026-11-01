import { ProposalStatus } from '../../features/interactions/enums/proposal-status.enum';
import { BadgeVariant } from '../components/badge/badge.component';

export const PROPOSAL_STATUS_BADGE: Record<ProposalStatus, BadgeVariant> = {
  [ProposalStatus.OPEN]: 'bg',
  [ProposalStatus.SENT]: 'notice',
  [ProposalStatus.ACCEPTED]: 'active',
  [ProposalStatus.REJECTED]: 'alert',
  [ProposalStatus.CLOSED]: 'inactive',
};
