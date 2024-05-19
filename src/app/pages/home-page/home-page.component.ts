import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoviesListComponent } from '@components/movies-list/movies-list.component';
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
    MoviesListComponent,
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
    private readonly changeDetectorRef: ChangeDetectorRef,
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
        this.changeDetectorRef.markForCheck();
      });
  }

  autoUpdateLastVisitedMovies() {
    return this.moviesService.fetchLastXVisitedMovies(5).subscribe((movies) => {
      this.lastVisitedMovies = movies;
      this.changeDetectorRef.markForCheck();
    });
  }

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }
}
