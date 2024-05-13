import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, map, take, takeUntil } from 'rxjs';
import { NgxsModule, Store } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { Movie } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';
import { Refresh } from '@shared/state/movies/movies.actions';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxsModule],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent {
  movies?: Movie[];

  destroyed$ = new Subject();

  constructor(private readonly store: Store) {
    this.refreshMoviesList();
    this.populateMovies();
  }

  refreshMoviesList() {
    this.store
      .dispatch(Refresh)
      .pipe(take(1))
      .subscribe(() => {
        console.log('refresh complete');
      });
  }

  populateMovies() {
    this.fetchMovies()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  fetchMovies() {
    return this.store.select(MoviesState.all).pipe(
      map((movies) => {
        return movies ?? [];
      }),
    );
  }

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }
}
