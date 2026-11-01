export interface WeeklyInteractionDay {
  date: string;
  dayName: string;
  isToday: boolean;
  call: number;
  email: number;
  meeting: number;
}

export interface WeeklyInteractionSummary {
  totals: {
    call: number;
    email: number;
    meeting: number;
  };

  days: WeeklyInteractionDay[];
}
