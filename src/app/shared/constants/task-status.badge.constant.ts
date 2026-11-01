import { TaskStatus } from '../../features/tasks/enums/task-status.enum';
import { BadgeVariant } from '../components/badge/badge.component';

export const TASK_STATUS_BADGE: Record<TaskStatus, BadgeVariant> = {
  [TaskStatus.ACTIVE]: 'bg',
  [TaskStatus.DONE]: 'active',
  [TaskStatus.PENDING]: 'inactive',
  [TaskStatus.REVIEW]: 'notice',
};
