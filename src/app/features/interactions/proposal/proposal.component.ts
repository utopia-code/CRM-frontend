import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-proposal',
  standalone: true,
  imports: [CommonModule, BadgeComponent, IconComponent],
  templateUrl: './proposal.component.html',
  styleUrl: './proposal.component.css',
})
export class ProposalComponent {}
