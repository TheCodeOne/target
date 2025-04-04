import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxDateAdapter } from '@aposin/ng-aquila/datefield';
import moment from 'moment/moment';

import { DatepickerComponent } from '../datepicker.component';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let dateAdapter: NxDateAdapter<string>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;

    dateAdapter = TestBed.inject(NxDateAdapter);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the input value correctly', () => {
    const testDate = '2000-01-01';
    component.value = testDate;
    fixture.detectChanges();

    const parsedDate = dateAdapter.parse(testDate, 'YYYY-MM-DD', true);
    expect(component['geburtsdatum']()).toEqual(parsedDate);
  });

  it('should emit dateChange event when date input changes', () => {
    const dateChangeSpy = jest.spyOn(component.dateChange, 'emit');

    const mockDate = moment('2000-01-01');
    const mockEvent = {
      target: {
        value: mockDate,
      },
    };

    component.updateDate(mockEvent as any);

    expect(dateChangeSpy).toHaveBeenCalledWith('2000-01-01');
  });
});
