import { ClientStatus } from '../../features/clients/enums/clientStatus.enum';
import { BadgeVariant } from '../components/badge/badge.component';

export const CLIENT_STATUS_BADGE: Record<ClientStatus, BadgeVariant> = {
  [ClientStatus.POTENTIAL]: 'bg',
  [ClientStatus.ACTIVE]: 'active',
  [ClientStatus.INACTIVE]: 'inactive',
};
