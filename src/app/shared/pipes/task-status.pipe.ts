import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../features/tasks/enums/task-status.enum';

@Pipe({
  name: 'taskStatus',
  standalone: true,
})
export class TaskStatusPipe implements PipeTransform {
  transform(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.PENDING:
        return 'Pendente';
      case TaskStatus.ACTIVE:
        return 'En curso';
      case TaskStatus.REVIEW:
        return 'Revisión';
      case TaskStatus.DONE:
        return 'Completado';
      default:
        return status;
    }
  }
}
