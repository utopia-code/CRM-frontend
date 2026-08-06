import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';

export interface TaskDetail {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;

  client: {
    organization: string;
  };

  schedule?: {
    endDate?: string;
    reminderDate?: string;
  };

  interactions: {
    total: number;
    calls: number;
    emails: number;
    visits: number;
  };
}
