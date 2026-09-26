import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';

export interface TaskDetail {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;

  client: {
    organization: string;
  } | null;

  scheduleEntry: {
    endDate: string | null;
    reminderDate: string | null;
  } | null;

  interactions: {
    total: number;
    calls: number;
    emails: number;
    meetings: number;
  } | null;
}
