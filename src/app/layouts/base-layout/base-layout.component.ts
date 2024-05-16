import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '@components/side-menu/side-menu.component';

@Component({
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    //Custom
    SideMenuComponent,
  ],
  selector: 'app-base-layout',
  standalone: true,
  styleUrl: './base-layout.component.scss',
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {}
