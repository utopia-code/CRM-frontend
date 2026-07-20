import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  open = input(false);

  title = input('');

  width = input('600px');

  closeOnBackdrop = input(true);

  closed = output<void>();

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && this.closeOnBackdrop()) {
      this.close();
    }
  }
}
