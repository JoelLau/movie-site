import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { MoviesPageComponent } from './movies-page.component';
import { MoviesPageService } from './movies-page.service';
import { Genres, Movies } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';
import { MOCK_MOVIES } from '@tests/mock-movies.data';
import { MoviesService } from '@services/movies/movies.service';

describe(MoviesPageComponent.name, () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;

  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Component under test
        MoviesPageComponent,

        // Angular dependencies
        ReactiveFormsModule,
        RouterModule.forRoot([]),

        // Third Party dependencies
        NgxsModule.forRoot([MoviesState], {
          developmentMode: true,
        }),
      ],
      providers: [
        {
          provide: MoviesPageService,
          useValue: {
            fetchFilteredMovies: () => of([]),
            fetchFilteredGenres: () => of([]),
          },
        },
        {
          provide: MoviesService,
          useValue: {
            fetchLastXVisitedMovies: () => of([]),
          },
        },
      ],
    }).compileComponents();

    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update query params when form values change', fakeAsync(() => {
    // sanity check
    expect(activatedRoute.snapshot.queryParams).toEqual({});

    component.form.patchValue({
      genres: ['Fantasy', 'Drama'],
      searchTerms: 'the lord of the rings',
    });

    fixture.detectChanges();
    tick(component.DEBOUNCE_TIME);

    fixture.whenStable().then(() => {
      activatedRoute = TestBed.inject(ActivatedRoute);
      expect(activatedRoute.snapshot.queryParams).toEqual({
        genres: 'Fantasy,Drama',
        searchTerms: 'the lord of the rings',
      });
    });
  }));

  it('should repopulate movies when query params change', fakeAsync(() => {
    expect(component.movies ?? []).toEqual([]);

    const movies: Movies = MOCK_MOVIES.slice(0, 2);
    const moviesPageService = TestBed.inject(MoviesPageService);
    jest
      .spyOn(moviesPageService, 'fetchFilteredMovies')
      .mockReturnValue(of(movies));

    fixture = TestBed.createComponent(MoviesPageComponent); // re-trigger constructor
    component = fixture.componentInstance;
    fixture.detectChanges();

    router.navigate([], {
      queryParams: { searchTerms: '', genres: [] },
      relativeTo: activatedRoute,
    });
    tick(component.DEBOUNCE_TIME);

    expect(component.movies).toEqual(movies);
  }));

  it('should repopulate genres when query params change', fakeAsync(() => {
    expect(component.genres ?? []).toEqual([]);

    const mockGenres: Genres = ['Action', 'Adventure', 'Drama'];
    const moviesPageService = TestBed.inject(MoviesPageService);
    jest
      .spyOn(moviesPageService, 'fetchFilteredGenres')
      .mockReturnValue(of(mockGenres));

    fixture = TestBed.createComponent(MoviesPageComponent); // re-trigger constructor
    component = fixture.componentInstance;
    fixture.detectChanges();

    router.navigate([], {
      queryParams: { searchTerms: '', genres: [] },
      relativeTo: activatedRoute,
    });

    tick(component.DEBOUNCE_TIME);

    expect(component.genres).toEqual(mockGenres);
  }));

  it('renders last visited', () => {
    const numberOfLastVisited = 5;
    const movies = MOCK_MOVIES.slice(0, numberOfLastVisited);
    const service = TestBed.inject(MoviesService);
    service.fetchLastXVisitedMovies = () => of(movies);

    // retrigger constructor
    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const page: HTMLElement = fixture.debugElement.nativeElement;
    expect(page.querySelectorAll('.visited-movies__item')).toHaveLength(
      numberOfLastVisited,
    );
  });
});
