import { ClientStatus } from '../enums/clientStatus.enum';
import { UpdateContactDto } from './update-contact.dto';

export interface UpdateClientDto {
  organization?: string;
  subject?: string | null;
  status?: ClientStatus;
  notes?: string | null;

  contacts?: UpdateContactDto[];
}
