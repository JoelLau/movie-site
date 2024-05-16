import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesService } from '@services/movies/movies.service';
import { Movie, Movies } from '@shared/state/movies/movies.models';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  popularMovies?: Movies;
  lastVisitedMovies?: Movies;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly moviesService: MoviesService,
  ) {
    this.autoUpdatePopularMovies();
    this.autoUpdateLastVisitedMovies();
  }

  autoUpdatePopularMovies() {
    return this.moviesService
      .fetchXMostPopularMovies(10)
      .subscribe((movies) => {
        this.popularMovies = movies;
        this.cdr.markForCheck();
      });
  }

  autoUpdateLastVisitedMovies() {
    return this.moviesService.fetchLastXVisitedMovies(5).subscribe((movies) => {
      this.lastVisitedMovies = movies;
      this.cdr.markForCheck();
    });
  }

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }
}
