import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-entity-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entity-item.component.html',
  styleUrl: './entity-item.component.css',
})
export class EntityItemComponent {
  title = input.required<string>();

  titleVariant = input<'default' | 'small'>('default');

  subtitle = input('');
  description = input('');

  initial = computed(() => this.title().charAt(0).toUpperCase());
}
