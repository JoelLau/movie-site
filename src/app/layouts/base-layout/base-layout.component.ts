import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LastVisitedFooterComponent } from '@components/last-visited-footer/last-visited-footer.component';
import { SideMenuComponent } from '@components/side-menu/side-menu.component';
import { Movies } from '@shared/state/movies/movies.models';

@Component({
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    //Custom
    SideMenuComponent,
    LastVisitedFooterComponent,
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
