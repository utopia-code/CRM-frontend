import { ClientStatus } from '../enums/clientStatus.enum';
import { Contact } from './contact.model';

export interface ClientSummary {
  calls: number;
  emails: number;
  meetings: number;
  completedTasks: number;
  pendingTasks: number;
}

export interface ClientDetail {
  id: number;
  organization: string;
  subject?: string;
  status: ClientStatus;
  notes?: string;
  contacts: Contact[];
  summary: ClientSummary;
}
