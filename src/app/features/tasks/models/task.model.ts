import { ScheduleEntry } from '../../calendar/models/schedule-entry.model';
import { Client } from '../../clients/models/client.model';
import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  client: Client | null;
  scheduleEntry: ScheduleEntry | null;
}
