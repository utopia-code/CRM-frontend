import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Interaction } from '../models/interaction.model';

@Injectable({
  providedIn: 'root',
})
export class InteractionsService {
  private http = inject(HttpClient);
  private api = `${environment.api}/interactions`;

  getInteractionsListByClient(clientId: number): Observable<Interaction[]> {
    return this.http.get<Interaction[]>(`${this.api}/clients/${clientId}/interactions`);
  }
}
