import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, take } from 'rxjs';
import { MoviesService } from '@services/movies/movies.service';
import { Movie, Movies } from '@shared/state/movies/movies.models';
import { Optional } from '@shared/type-helpers';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  popularMovies?: Movie[];

  constructor(
    private readonly moviesService: MoviesService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.bindPopularMovies();
  }

  fetchTopMovies() {
    return this.moviesService.fetchMovieList().pipe(
      map((movies) => sortByPopularity(movies)),
      map((movies) => getFirstX(movies, 10)),
    );
  }

  bindPopularMovies() {
    return this.fetchTopMovies()
      .pipe(take(1))
      .subscribe((movies) => {
        this.popularMovies = movies;
        this.cdr.markForCheck();
      });
  }

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }
}

function sortByPopularity(movies: Optional<Movies>): Optional<Movies> {
  return movies?.sort(
    (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity),
  );
}

function getFirstX(movies: Optional<Movies>, x: number): Optional<Movies> {
  return movies?.slice(0, x);
}
