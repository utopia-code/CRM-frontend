import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type BadgeVariant = 'bg' | 'active' | 'notice' | 'inactive' | 'alert' | 'purple' | 'cyan';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @Input({ required: true }) text!: string;

  @Input()
  variant: BadgeVariant = 'bg';
}
