import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, map, of, switchMap } from 'rxjs';
import { BaseLayoutComponent } from '@layouts/base-layout/base-layout.component';
import { MoviesService } from '@services/movies/movies.service';
import { Movie, Movies } from '@shared/state/movies/movies.models';
import { TrackMoviePageVisit } from '@shared/state/user/user.actions';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // Custom
    BaseLayoutComponent,
  ],
  templateUrl: './movie-page.component.html',
})
export class MoviePageComponent {
  movie?: Movie;
  lastVisitedMovies?: Movies;

  movieLoaded = true;
  lastVisitedMoviesLoaded = true;
  slug$: Observable<string | undefined> = this.activatedRoute.params.pipe(
    map((param) => param['slug']),
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store,
    private readonly moviesService: MoviesService,
  ) {
    this.autoUpdateMovie();
    this.autoUpdateLastVisitedMovies();
  }

  trackVisit(movie?: Movie) {
    if (!movie) return of(undefined);

    return this.store.dispatch(new TrackMoviePageVisit(movie));
  }

  autoUpdateMovie() {
    return this.slug$
      .pipe(
        switchMap((slug: string | undefined) => {
          return slug ? this.moviesService.fetchMovie(slug) : of(undefined);
        }),
      )
      .subscribe((movie) => {
        this.movie = movie;
        this.trackVisit(movie);
        this.movieLoaded = false;
      });
  }

  autoUpdateLastVisitedMovies() {
    return this.moviesService.fetchLastXVisitedMovies(5).subscribe((movies) => {
      this.lastVisitedMovies = movies;
      this.lastVisitedMoviesLoaded = false;
    });
  }

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }
}
