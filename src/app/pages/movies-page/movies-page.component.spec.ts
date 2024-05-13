import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MoviesPageComponent } from './movies-page.component';

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
    it.each(['.side-menu', 'main'])('%s', (selector) => {
      const page: HTMLElement = fixture.debugElement.nativeElement;
      expect(page.querySelector(selector)).toBeTruthy();
    });
  });
});
