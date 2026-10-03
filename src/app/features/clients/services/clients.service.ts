import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DeleteResponse } from '../../../core/modals/delete-response';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { ClientDetail } from '../models/client-detail.model';
import { ClientList } from '../models/client-list.model';
import { Client } from '../models/client.model';
import { ClientName } from '../models/clients-name.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);
  private api = `${environment.api}/clients`;

  // GET LIST OF CLIENTS
  getClientsList(): Observable<ClientList[]> {
    return this.http.get<ClientList[]>(`${this.api}/list`);
  }

  // GET LIST OF CLIENTS BY NAME
  getClientsName(): Observable<ClientName[]> {
    return this.http.get<ClientName[]>(`${this.api}/organization-list`);
  }

  // CREATE CLIENT
  createClient(client: CreateClientDto): Observable<Client> {
    return this.http.post<Client>(this.api, client);
  }

  // EDIT CLIENT
  updateClient(id: number, clientData: UpdateClientDto): Observable<Client> {
    return this.http.patch<Client>(`${this.api}/${id}`, clientData);
  }

  // DELETE CLIENT
  removeClient(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.api}/${id}`);
  }

  getClient(id: number): Observable<ClientDetail> {
    return this.http.get<ClientDetail>(`${this.api}/${id}`);
  }
}
