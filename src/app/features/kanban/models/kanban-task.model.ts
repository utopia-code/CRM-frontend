import { TaskStatus } from '../../tasks/enums/task-status.enum';

export interface KanbanTask {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  client: {
    organization: string;
  } | null;
  scheduleEntry: {
    endDate: Date | null;
    reminderDate: Date | null;
  } | null;
}
