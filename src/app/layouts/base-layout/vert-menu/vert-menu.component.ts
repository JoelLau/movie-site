import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SvgFilmComponent } from '@components/svg/film.svg.component';
import { SvgHomeComponent } from '@components/svg/home.svg.component';

@Component({
  selector: 'app-vert-menu',
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // Icons
    SvgHomeComponent,
    SvgFilmComponent,
  ],
  templateUrl: './vert-menu.component.html',
  styleUrl: './vert-menu.component.scss',
})
export class VertMenuComponent {}
