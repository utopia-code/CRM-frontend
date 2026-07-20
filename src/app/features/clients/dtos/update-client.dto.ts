import { UpdateContactDto } from './update-contact.dto';

export interface UpdateClientDto {
  organization?: string;
  subject?: string;
  status?: string;
  notes?: string;

  contacts?: UpdateContactDto[];
}
