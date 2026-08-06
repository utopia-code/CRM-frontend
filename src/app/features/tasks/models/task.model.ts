import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  clientId?: number;
}
