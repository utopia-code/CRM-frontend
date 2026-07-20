import { CreateContactDto } from './create-contact.dto';

export interface CreateClientDto {
  organization: string;
  subject?: string;
  status?: string;
  notes?: string;

  contacts?: CreateContactDto[];
}
