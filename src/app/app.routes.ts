import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('./features/clients/clients.component').then((m) => m.ClientsComponent),
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('./features/catalog/catalog.component').then((m) => m.CatalogComponent),
  },
  {
    path: 'campaigns',
    loadComponent: () =>
      import('./features/campaigns/campaigns.component').then((m) => m.CampaignsComponent),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/tasks.component').then((m) => m.TasksComponent),
  },
  {
    path: 'kanban',
    loadComponent: () =>
      import('./features/kanban/kanban.component').then((m) => m.KanbanComponent),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./features/calendar/calendar.component').then((m) => m.CalendarComponent),
  },
  {
    path: 'inquiries',
    loadComponent: () =>
      import('./features/inquiries/inquiries.component').then((m) => m.InquiriesComponent),
  },
  {
    path: 'meetings',
    loadComponent: () =>
      import('./features/meetings/meetings.component').then((m) => m.MeetingsComponent),
  },
  {
    path: 'grants',
    loadComponent: () =>
      import('./features/grants/grants.component').then((m) => m.GrantsComponent),
  },
  {
    path: 'activity',
    loadComponent: () =>
      import('./features/activity/activity.component').then((m) => m.ActivityComponent),
  },
  { path: '**', component: DashboardComponent },
];
