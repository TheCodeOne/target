import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorToastrComponent } from './error-toastr.component';

describe('ErrorToastrComponent', () => {
  let component: ErrorToastrComponent;
  let fixture: ComponentFixture<ErrorToastrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorToastrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
