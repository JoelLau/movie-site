import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseLayoutComponent } from '@layouts/base-layout/base-layout.component';
import { MoviesService } from '@services/movies/movies.service';
import { Movie, Movies } from '@shared/state/movies/movies.models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // Custom
    BaseLayoutComponent,
  ],
  selector: 'app-home-page',
  standalone: true,
  styleUrl: './home-page.component.scss',
  templateUrl: './home-page.component.html',
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
