import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { Movie, Movies } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';
import { Refresh } from '@shared/state/movies/movies.actions';
import { Optional } from '@shared/type-helpers';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
        map((x) => x.slice()),
        map((movies: Optional<Movies>) =>
          movies?.sort((a, b) => b.popularity - a.popularity),
        ),
        map((movies) => movies?.slice(0, 10)),
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
