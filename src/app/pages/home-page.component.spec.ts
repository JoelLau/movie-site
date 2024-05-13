import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { MockProvider } from 'ng-mocks';
import { HomePageComponent } from './home-page.component';
import { generateMockMovies } from '@test-helpers/movie-generator';
import { MoviesState } from '@shared/state/movies/movies.state';
import { MoviesApiService } from '@services/movies-api.service';

describe(HomePageComponent.name, () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePageComponent,
        NgxsModule.forRoot([MoviesState], { developmentMode: true }),
      ],
      providers: [MockProvider(MoviesApiService)],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render popular movies', async () => {
    component.popularMovies = generateMockMovies(10);

    fixture.detectChanges();
    await fixture.whenStable();

    const page: HTMLElement = fixture.debugElement.nativeElement;
    expect(page.querySelectorAll('.movie-list__item')).toHaveLength(10);
  });
});
