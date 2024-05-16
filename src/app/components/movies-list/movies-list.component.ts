import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie, Movies } from '@shared/state/movies/movies.models';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent {
  @Input()
  movies?: Movies;

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }
}
