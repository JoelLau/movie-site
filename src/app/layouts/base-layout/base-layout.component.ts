import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-base-layout',
  standalone: true,
  styleUrl: './base-layout.component.scss',
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {}
