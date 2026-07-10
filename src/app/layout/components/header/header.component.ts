import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private headerService = inject(HeaderService);

  config = this.headerService.config;
}
