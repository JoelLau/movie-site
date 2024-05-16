import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '@shared/state/movies/movies.models';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent {
  movie?: Movie = this.activatedRoute.snapshot.data['movie'];

  constructor(private readonly activatedRoute: ActivatedRoute) {}
}
