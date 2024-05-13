import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';

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

  constructor() {
    this.populatePopularMovies();
  }

  populatePopularMovies() {
    this.fetchMovies()
      .pipe(
        map((movies) => movies.sort((a, b) => b - a)),
        map((movies) => movies.slice(0, 10)),
        takeUntil(this.destroyed$),
      )
      .subscribe((movies) => {
        this.popularMovies = movies;
      });
  }

  fetchMovies(): Observable<Movies> {
    // TODO: populate
    return of([]);
  }

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }
}

export type Movies = Movie[];
export type Movie = any;
