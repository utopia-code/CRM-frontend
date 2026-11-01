import { TaskStatus } from '../../tasks/enums/task-status.enum';

export interface RecentTasks {
  id: number;
  title: string;
  status: TaskStatus;
  endDate: string | null;
  organization: string | null;
}
