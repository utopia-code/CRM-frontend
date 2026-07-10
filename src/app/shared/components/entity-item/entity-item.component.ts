import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entity-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entity-item.component.html',
  styleUrl: './entity-item.component.css',
})
export class EntityItemComponent {
  @Input({ required: true })
  title!: string;

  @Input()
  subtitle = '';

  @Input()
  description = '';

  get initial(): string {
    return this.title.charAt(0).toUpperCase();
  }
}
