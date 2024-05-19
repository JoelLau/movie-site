import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { MoviesService } from '@services/movies/movies.service';

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
      providers: [
        {
          provide: MoviesService,
          useValue: {
            fetchXMostPopularMovies: () => of([]),
            fetchLastXVisitedMovies: () => of([]),
          },
        },
      ],
    })
      .overrideComponent(HomePageComponent, {
        set: {
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
