import { TaskPriority } from '../../features/tasks/enums/task-priority.enum';
import { BadgeVariant } from '../components/badge/badge.component';

export const TASK_PRIORITY_BADGE: Record<TaskPriority, BadgeVariant> = {
  [TaskPriority.HIGH]: 'alert',
  [TaskPriority.LOW]: 'active',
  [TaskPriority.MEDIUM]: 'notice',
};
