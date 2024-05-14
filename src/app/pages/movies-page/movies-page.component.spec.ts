import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { MoviesPageComponent } from './movies-page.component';
import { MoviesState } from '@shared/state/movies/movies.state';
import { MoviesApiService } from '@services/movies-api.service';
import { generateMockMovies } from '@test-helpers/movie-generator';

describe('MoviesPageComponent', () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Component under test
        MoviesPageComponent,

        // Angular dependencies
        RouterModule.forRoot([]),

        // Third-party dependencies
        NgxsModule.forRoot([MoviesState], { developmentMode: true }),
      ],
      providers: [MockProvider(MoviesApiService)],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page contents', () => {
    it.each([' main', '.side-menu', '.movie-list'])('%s', (selector) => {
      const page: HTMLElement = fixture.debugElement.nativeElement;
      expect(page.querySelector(selector)).toBeTruthy();
    });
  });

  it('should render popular movies', async () => {
    component.movies = generateMockMovies(250);

    fixture.detectChanges();
    await fixture.whenStable();

    const page: HTMLElement = fixture.debugElement.nativeElement;
    expect(page.querySelectorAll('.movie-list__item')).toHaveLength(250);
  });
});
