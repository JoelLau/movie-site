import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { HomePageComponent } from './home-page.component';
import { BaseLayoutComponent } from '@layouts/base-layout/base-layout.component';
import { MoviesService } from '@services/movies/movies.service';
import { MoviesListComponent } from 'src/app/components/movies-list/movies-list.component';

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

        // Custom
        MoviesListComponent,
        BaseLayoutComponent,
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
        remove: { imports: [BaseLayoutComponent] },
        add: {
          imports: [MockComponent(BaseLayoutComponent)],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      // set: { changeDetection: ChangeDetectionStrategy.Default },
      .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page contents', () => {
    it.each([' main'])('%s', (selector) => {
      const page: HTMLElement = fixture.debugElement.nativeElement;
      expect(page.querySelector(selector)).toBeTruthy();
    });
  });
});
