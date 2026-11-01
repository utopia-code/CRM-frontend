import { Pipe, PipeTransform } from '@angular/core';
import { ProposalStatus } from '../../features/interactions/enums/proposal-status.enum';

@Pipe({
  name: 'proposalStatus',
  standalone: true,
})
export class ProposalStatusPipe implements PipeTransform {
  transform(status: ProposalStatus): string {
    switch (status) {
      case ProposalStatus.ACCEPTED:
        return 'aceptada';
      case ProposalStatus.CLOSED:
        return 'pechada';
      case ProposalStatus.OPEN:
        return 'aberta';
      case ProposalStatus.REJECTED:
        return 'rexeitada';
      case ProposalStatus.SENT:
        return 'enviada';
      default:
        return status;
    }
  }
}
