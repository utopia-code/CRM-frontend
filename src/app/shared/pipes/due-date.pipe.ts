import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDate',
  standalone: true,
})
export class DueDatePipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const msPerDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((date.getTime() - today.getTime()) / msPerDay);

    switch (diffDays) {
      case 0:
        return 'Hoxe';
      case 1:
        return 'Mañá';
      case -1:
        return 'Vencida · Onte';
    }

    if (diffDays < -1) {
      return `Vencida · Hai ${Math.abs(diffDays)} días`;
    }

    if (diffDays <= 7) {
      return `En ${diffDays} días`;
    }

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };

    if (date.getFullYear() !== today.getFullYear()) {
      options.year = 'numeric';
    }

    return `${date.toLocaleDateString('gl-ES', options)}`;
  }
}
