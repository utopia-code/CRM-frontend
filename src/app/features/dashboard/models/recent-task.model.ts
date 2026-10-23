import { TaskStatus } from '../../tasks/enums/task-status.enum';

export interface RecentTask {
  id: number;
  title: string;
  status: TaskStatus;
  endDate: string | null;
}
