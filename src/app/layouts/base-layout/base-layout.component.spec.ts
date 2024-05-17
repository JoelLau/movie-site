import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { BaseLayoutComponent } from './base-layout.component';
import { LastVisitedFooterComponent } from './last-visited-footer/last-visited-footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MoviesListComponent } from 'src/app/components/movies-list/movies-list.component';

describe(BaseLayoutComponent.name, () => {
  let component: BaseLayoutComponent;
  let fixture: ComponentFixture<BaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Component under test
        BaseLayoutComponent,

        // Angular dependencies
        RouterModule.forRoot([]),
      ],
    })
      .overrideComponent(LastVisitedFooterComponent, {
        set: {
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each(['app-side-menu'])('%s', (selector) => {
    expect(fixture.debugElement.query(By.css(selector))).toBeTruthy();
  });
});
