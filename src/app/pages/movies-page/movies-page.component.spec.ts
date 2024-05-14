import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { MoviesPageFiltersState } from './movies-page-filters.state';
import { MoviesPageComponent } from './movies-page.component';
import { MoviesPageService } from './movies-page.service';
import { Movies } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';
import { Optional } from '@shared/type-helpers';
import { generateMockMovies } from '@tests/movie-generator';

describe(MoviesPageComponent.name, () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Component under test
        MoviesPageComponent,

        // Angular dependencies
        ReactiveFormsModule,
        RouterModule.forRoot([]),

        // Third Party dependencies
        NgxsModule.forRoot([MoviesState, MoviesPageFiltersState], {
          developmentMode: true,
        }),
        NgxsFormPluginModule.forRoot(),
      ],
      providers: [
        {
          provide: MoviesPageService,
          useValue: {
            fetchMovieList: () => of([]),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            fetchGenres: (movies$: Observable<Optional<Movies>>) => of([]),
          },
        },
      ],
    }).compileComponents();

    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update query params when form values change', async () => {
    expect(activatedRoute.snapshot.queryParams).toEqual({});
    component.form.patchValue({
      genres: ['Fantasy', 'Drama'],
      searchTerms: 'the lord of the rings',
    });

    fixture.detectChanges();
    await fixture.whenStable();

    activatedRoute = TestBed.inject(ActivatedRoute);
    expect(activatedRoute.snapshot.queryParams).toEqual({
      genres: 'Fantasy,Drama',
      searchTerms: 'the lord of the rings',
    });
  });
});
