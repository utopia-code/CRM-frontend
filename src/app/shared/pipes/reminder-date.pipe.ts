import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reminderDate',
  standalone: true,
})
export class ReminderDatePipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const now = new Date();

    const time = date.toLocaleTimeString('gl-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const diffMs = date.getTime() - now.getTime();

    const dateWithoutTime = new Date(date);
    dateWithoutTime.setHours(0, 0, 0, 0);

    const todayWithoutTime = new Date(now);
    todayWithoutTime.setHours(0, 0, 0, 0);

    const calendarDiffDays = Math.round(
      (dateWithoutTime.getTime() - todayWithoutTime.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (calendarDiffDays === 0) {
      return `Hoxe · ${time}`;
    }

    if (calendarDiffDays === 1) {
      return `Mañá · ${time}`;
    }

    if (diffMs < 0) {
      const daysAgo = Math.abs(calendarDiffDays);

      if (daysAgo === 0) {
        return `Vencida · ${time}`;
      }

      return `Hai ${daysAgo} días`;
    }

    if (calendarDiffDays <= 7) {
      return `En ${calendarDiffDays} días · ${time}`;
    }

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };

    if (date.getFullYear() !== now.getFullYear()) {
      options.year = 'numeric';
    }

    return `${date.toLocaleDateString('gl-ES', options)} · ${time}`;
  }
}
