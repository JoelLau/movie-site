import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie, Movies } from '@shared/state/movies/movies.models';

@Component({
  selector: 'app-last-visited-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './last-visited-footer.component.html',
  styleUrl: './last-visited-footer.component.scss',
})
export class LastVisitedFooterComponent {
  @Input()
  movies?: Movies;

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }
}
