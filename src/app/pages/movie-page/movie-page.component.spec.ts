import { of } from 'rxjs';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviePageComponent } from './movie-page.component';
import { Movie } from '@shared/state/movies/movies.models';
import { MoviesService } from '@services/movies/movies.service';
import { MoviesState } from '@shared/state/movies/movies.state';
import { UserState } from '@shared/state/user/user.state';
import { MOCK_MOVIES } from '@tests/mock-movies.data';

describe(MoviePageComponent.name, () => {
  let component: MoviePageComponent;
  let fixture: ComponentFixture<MoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Component under test
        MoviePageComponent,

        // Angular dependencies
        RouterModule.forRoot([]),

        // Third-party dependencies
        NgxsModule.forRoot([MoviesState, UserState], {
          developmentMode: true,
        }),
      ],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            fetchMovie: () => of([]),
            fetchLastXVisitedMovies: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders movie if exists', () => {
    const mockMovie: Movie = MOCK_MOVIES[0];
    const service = TestBed.inject(MoviesService);
    jest.spyOn(service, 'fetchMovie').mockReturnValue(of(mockMovie));

    const mockParams: Params = { slug: mockMovie.slug };
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.params = of(mockParams);

    // retrigger constructor
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const rendered: HTMLElement = fixture.debugElement.nativeElement;
    expect(rendered.querySelector('[data-testid=not-found]')).toBeFalsy();
  });

  it('renders movie if exists', () => {
    const service = TestBed.inject(MoviesService);
    jest.spyOn(service, 'fetchMovie').mockReturnValue(of(undefined));

    const mockParams: Params = { slug: 'some-slug-that-does-t-exist' };
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.params = of(mockParams);

    // retrigger constructor
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const rendered: HTMLElement = fixture.debugElement.nativeElement;
    expect(fixture.componentInstance.movie).toBeFalsy();
    expect(rendered.querySelector('[data-testid=not-found]')).toBeTruthy();
  });

  it('renders last visited', () => {
    const numberOfLastVisited = 5;
    const movies = MOCK_MOVIES.slice(0, numberOfLastVisited);
    const service = TestBed.inject(MoviesService);
    service.fetchLastXVisitedMovies = () => of(movies);

    // retrigger constructor
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    component.movie = MOCK_MOVIES[0];
    fixture.detectChanges();

    const page: HTMLElement = fixture.debugElement.nativeElement;
    expect(page.querySelectorAll('.visited-movies__item')).toHaveLength(
      numberOfLastVisited,
    );
  });
});
