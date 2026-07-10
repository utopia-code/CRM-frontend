import { Pipe, PipeTransform } from '@angular/core';
import { ClientStatus } from '../../features/clients/enums/clientStatus.enum';

@Pipe({
  name: 'clientStatus',
  standalone: true,
})
export class ClientStatusPipe implements PipeTransform {
  transform(status: ClientStatus): string {
    switch (status) {
      case ClientStatus.POTENTIAL:
        return 'Potencial';
      case ClientStatus.ACTIVE:
        return 'Activo';
      case ClientStatus.INACTIVE:
        return 'Inactivo';
      default:
        return status;
    }
  }
}
