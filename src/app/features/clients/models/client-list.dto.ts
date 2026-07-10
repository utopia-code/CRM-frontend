import { ClientStatus } from "../enums/clientStatus.enum";

export interface ClientListContact {
  id: number;
  name: string;
  role: string;
  email: string;
  telephone: string;
}

export interface ClientList {
  id: number;
  organization: string;
  status: ClientStatus;

  contacts: ClientListContact[];

  interactionsCount: number;
  tasksCount: number;
}