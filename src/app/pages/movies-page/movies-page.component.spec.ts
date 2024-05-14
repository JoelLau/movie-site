import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesPageComponent } from './movies-page.component';
import { generateMockMovies } from '@test-helpers/movie-generator';

describe.skip(MoviesPageComponent.name, () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Component under test
        MoviesPageComponent,

        // Angular
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page contents', () => {
    it.each([' main', '.side-menu', '.movie-list', '#movie-search-bar'])(
      '%s',
      (selector) => {
        const page: HTMLElement = fixture.debugElement.nativeElement;
        expect(page.querySelector(selector)).toBeTruthy();
      },
    );
  });

  it('should render `component.movies`', async () => {
    const expectedNumberOfMovies = 250;
    component.movies = generateMockMovies(expectedNumberOfMovies);

    fixture.detectChanges();
    await fixture.whenStable();

    const page: HTMLElement = fixture.debugElement.nativeElement;
    expect(page.querySelectorAll('.movie-list__item')).toHaveLength(
      expectedNumberOfMovies,
    );
  });
});
