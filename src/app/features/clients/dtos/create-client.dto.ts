import { ClientStatus } from '../enums/clientStatus.enum';
import { CreateContactDto } from './create-contact.dto';

export interface CreateClientDto {
  organization: string;
  subject?: string | null;
  status?: ClientStatus;
  notes?: string | null;

  contacts?: CreateContactDto[];
}
