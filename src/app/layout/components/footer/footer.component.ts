import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BackupService } from '../../../core/services/backup.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  selectedFile?: File;

  private readonly backupService = inject(BackupService);

  exportBackup() {
    this.backupService.exportBackup().subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;

      link.download = `backup-${new Date().toISOString()}.json`;

      link.click();

      window.URL.revokeObjectURL(url);
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.restoreBackup();
    }
  }

  restoreBackup() {
    if (!this.selectedFile) {
      return;
    }

    this.backupService.restoreBackup(this.selectedFile).subscribe({
      next: (response) => {
        console.log('Backup restaurado:', response);
      },

      error: (error) => {
        console.error('Error restaurando backup:', error);
      },
    });
  }
}
