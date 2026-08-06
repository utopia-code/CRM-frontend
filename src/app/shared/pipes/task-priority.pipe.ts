import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../../features/tasks/enums/task-priority.enum';

@Pipe({
  name: 'taskPriority',
  standalone: true,
})
export class TaskPriorityPipe implements PipeTransform {
  transform(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'alta';
      case TaskPriority.LOW:
        return 'baixa';
      case TaskPriority.MEDIUM:
        return 'media';
      default:
        return priority;
    }
  }
}
