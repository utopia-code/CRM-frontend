import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientList } from '../models/client-list.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private http = inject(HttpClient);
  private api = 'http://localhost:3000/api/clients/list';

  getClientsList(): Observable<ClientList[]> {
    return this.http.get<ClientList[]>(this.api);
  }

  create(customer: ClientList): Observable<ClientList> {
    return this.http.post<ClientList>(this.api, customer);
  }
}
