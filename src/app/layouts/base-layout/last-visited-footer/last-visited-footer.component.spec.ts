import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LastVisitedFooterComponent } from './last-visited-footer.component';

describe('LastVisitedFooterComponent', () => {
  let component: LastVisitedFooterComponent;
  let fixture: ComponentFixture<LastVisitedFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastVisitedFooterComponent],
    })
      .overrideComponent(LastVisitedFooterComponent, {
        set: {
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LastVisitedFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
