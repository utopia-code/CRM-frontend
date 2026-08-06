import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';

export interface TaskList {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  client: {
    id: number;
    organization: string;
  } | null;
  endDate: Date | null;
  reminderDate: Date | null;
}
