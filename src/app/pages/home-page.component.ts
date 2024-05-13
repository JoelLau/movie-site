import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { Movie, Movies } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';
import { Refresh } from '@shared/state/movies/movies.actions';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  popularMovies?: Movie[];

  destroyed$ = new Subject();

  constructor(private readonly store: Store) {
    this.refreshMoviesList();
    this.populatePopularMovies();
  }

  refreshMoviesList() {
    this.store
      .dispatch(Refresh)
      .pipe(take(1))
      .subscribe(() => {
        console.log('refresh complete');
      });
  }

  populatePopularMovies() {
    this.fetchMovies()
      .pipe(
        map((movies: Movies) => {
          return movies
            .slice() // ngxs freezes array to prevent mutation
            .sort((a, b) => b.popularity - a.popularity);
        }),
        map((movies) => {
          return movies.slice(0, 10);
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe((movies) => {
        this.popularMovies = movies;
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
