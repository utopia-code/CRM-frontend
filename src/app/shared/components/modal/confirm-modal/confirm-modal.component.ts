import { Component, input, output } from '@angular/core';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  open = input(false);
  title = input('Confirmar');
  message = input('');
  confirmed = output<void>();
  closed = output<void>();

  confirm(): void {
    this.confirmed.emit();
  }

  close(): void {
    this.closed.emit();
  }
}
