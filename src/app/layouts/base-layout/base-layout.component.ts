import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LastVisitedFooterComponent } from './last-visited-footer/last-visited-footer.component';
import { VertMenuComponent } from './vert-menu/vert-menu.component';
import { SvgHomeComponent } from '@components/svg/home.svg.component';
import { Movies } from '@shared/state/movies/movies.models';

@Component({
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    //Custom
    LastVisitedFooterComponent,
    SvgHomeComponent,
    VertMenuComponent,
  ],
  selector: 'app-base-layout',
  standalone: true,
  styleUrl: './base-layout.component.scss',
  templateUrl: './base-layout.component.html',
})
export class BaseLayoutComponent {
  @Input()
  lastVisitedMovies?: Movies;
}
