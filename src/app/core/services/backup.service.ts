import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RestoreBackupResponse {
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BackupService {
  private readonly http = inject(HttpClient);
  private api = `${environment.api}/backup`;

  exportBackup(): Observable<Blob> {
    return this.http.get(`${this.api}/export`, {
      responseType: 'blob',
    });
  }

  restoreBackup(file: File): Observable<RestoreBackupResponse> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<RestoreBackupResponse>(`${this.api}/restore`, formData);
  }
}
