import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLibComponent } from '../view-lib.component';

describe('ViewLibComponent', () => {
  let component: ViewLibComponent;
  let fixture: ComponentFixture<ViewLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
