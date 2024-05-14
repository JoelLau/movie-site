import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { MoviesService } from '@services/movies/movies.service';
import { generateMockMovies } from '@tests/movie-generator';

const MovieServiceProvider = {
  provide: MoviesService,
  useValue: {
    fetchMovieList: () => of([]),
  },
};

describe(HomePageComponent.name, () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Component under test
        HomePageComponent,

        // Angular dependencies
        RouterModule.forRoot([]),
      ],
      providers: [MovieServiceProvider],
    })
      .overrideComponent(HomePageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page contents', () => {
    it.each([' main', '.movie-list', '.side-menu'])('%s', (selector) => {
      const page: HTMLElement = fixture.debugElement.nativeElement;
      expect(page.querySelector(selector)).toBeTruthy();
    });
  });

  it('should render `component.popularMovies`', async () => {
    const expectedNumberOfMovies = 10;
    component.popularMovies = generateMockMovies(expectedNumberOfMovies);

    fixture.detectChanges();
    await fixture.whenStable();

    const page: HTMLElement = fixture.debugElement.nativeElement;
    expect(page.querySelectorAll('.movie-list__item')).toHaveLength(
      expectedNumberOfMovies,
    );
  });
});
