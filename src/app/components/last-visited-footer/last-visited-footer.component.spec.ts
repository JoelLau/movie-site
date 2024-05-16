import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LastVisitedFooterComponent } from './last-visited-footer.component';

describe('LastVisitedFooterComponent', () => {
  let component: LastVisitedFooterComponent;
  let fixture: ComponentFixture<LastVisitedFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastVisitedFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LastVisitedFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
