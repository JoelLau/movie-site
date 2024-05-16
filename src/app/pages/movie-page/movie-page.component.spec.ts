import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { MoviePageComponent } from './movie-page.component';
import { Movie } from '@shared/state/movies/movies.models';
import { MOCK_MOVIES } from '@tests/mock-movies.data';

describe(MoviePageComponent.name, () => {
  let component: MoviePageComponent;
  let fixture: ComponentFixture<MoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviePageComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movie from router', () => {
    const mockMovie: Movie = MOCK_MOVIES[0];
    const data: Data = { movie: mockMovie };

    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot.data = data;

    // retrigger constructor
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.movie).toBe(mockMovie);
  });

  it('movie not found', () => {
    const rendered: HTMLElement = fixture.debugElement.nativeElement;
    expect(rendered.querySelector('[data-testid=not-found]')).toBeTruthy();
  });
});
