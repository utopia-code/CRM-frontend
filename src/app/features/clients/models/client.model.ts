import { ClientStatus } from '../enums/clientStatus.enum';
import { Contact } from './contact.model';

export interface Client {
  id: number;
  organization: string;
  subject?: string;
  status: ClientStatus;
  notes?: string;
  contacts: Contact[];
}
