import { ReminderStatus } from '../enums/reminder-status.enum';
import { ScheduleType } from '../enums/schedule-type.enum';

export interface ScheduleEntry {
  id: number;
  type: ScheduleType;
  startDate: string;
  endDate: string | null;
  reminderDate: string | null;
  reminderStatus: ReminderStatus;
}
