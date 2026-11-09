import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClientProposalsResponseDto } from '../models/interaction-proposal.model';
import { ClientInteractionsResponse } from '../models/interaction.model';

@Injectable({
  providedIn: 'root',
})
export class InteractionsService {
  private http = inject(HttpClient);
  private api = `${environment.api}/interactions`;

  getInteractionsListByClient(clientId: number): Observable<ClientInteractionsResponse> {
    return this.http.get<ClientInteractionsResponse>(
      `${this.api}/clients/${clientId}/interactions`,
    );
  }

  getInteractionsProposalListByClient(clientId: number): Observable<ClientProposalsResponseDto> {
    return this.http.get<ClientProposalsResponseDto>(`${this.api}/clients/${clientId}/proposals`);
  }
}
