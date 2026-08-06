import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDateStatus',
  standalone: true,
})
export class DueDateStatusPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diffDays = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return 'due-date--overdue';
    }

    if (diffDays === 0) {
      return 'due-date--today';
    }

    if (diffDays <= 7) {
      return 'due-date--soon';
    }

    return 'due-date--future';
  }
}
