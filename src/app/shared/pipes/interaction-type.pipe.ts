import { Pipe, PipeTransform } from '@angular/core';
import { InteractionType } from '../../features/interactions/enums/interaction-type.enum';

@Pipe({
  name: 'interactionType',
  standalone: true,
})
export class InteractionTypePipe implements PipeTransform {
  transform(type: InteractionType): string {
    switch (type) {
      case InteractionType.CALL:
        return 'Tel';
      case InteractionType.EMAIL:
        return 'Email';
      case InteractionType.MEETING:
        return 'Visita';
      default:
        return type;
    }
  }
}
