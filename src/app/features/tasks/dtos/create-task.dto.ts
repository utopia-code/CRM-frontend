import { TaskStatus } from '../enums/task-status.enum';

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  clientId?: number;

  endDate?: Date;
  reminderDate?: Date;
}
