import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';

interface NavItem {
  label: string;
  route: string;
  section: string;
  icon: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  menu: NavItem[] = [
    { section: 'Principal', label: 'Panel', route: '/', icon: 'dashboard' },

    { section: 'Xestión', label: 'Clientes', route: '/clients', icon: 'users' },
    { section: 'Xestión', label: 'Catálogo', route: '/catalog', icon: 'catalog' },
    { section: 'Xestión', label: 'Campañas', route: '/campaigns', icon: 'activity' },

    { section: 'Organización', label: 'Tareas', route: '/tasks', icon: 'task' },
    { section: 'Organización', label: 'Taboleiro', route: '/kanban', icon: 'kanban' },
    { section: 'Organización', label: 'Calendario', route: '/calendar', icon: 'calendar' },
    { section: 'Organización', label: 'Consultas', route: '/inquiries', icon: 'messages' },
    { section: 'Organización', label: 'Xuntanzas', route: '/meetings', icon: 'users' },
    { section: 'Organización', label: 'Axudas', route: '/grants', icon: 'funding' },
    { section: 'Organización', label: 'Seguimento', route: '/activity', icon: 'activity' },
  ];

  get sections(): string[] {
    return [...new Set(this.menu.map((i) => i.section))];
  }

  getItemsBySection(section: string): NavItem[] {
    return this.menu.filter((i) => i.section === section);
  }
}
