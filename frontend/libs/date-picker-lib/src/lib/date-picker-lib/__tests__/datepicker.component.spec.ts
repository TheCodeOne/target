import { ComponentFixture, TestBed } from '@angular/core/testing';
import moment from 'moment/moment';

import { DatepickerComponent } from '../datepicker.component';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default empty value', () => {
    expect(component.value).toBe('');
  });

  it('should set min date to 100 years ago', () => {
    const expectedMinDate = moment().subtract(100, 'years').startOf('day');
    const componentMinDate = component['minDate'].startOf('day');

    expect(componentMinDate.isSame(expectedMinDate, 'day')).toBeTruthy();
  });

  it('should set max date to 18 years ago', () => {
    const expectedMaxDate = moment().subtract(18, 'years').startOf('day');
    const componentMaxDate = component['maxDate'].startOf('day');

    expect(componentMaxDate.isSame(expectedMaxDate, 'day')).toBeTruthy();
  });

  it('should call onChange when value changes', () => {
    const date = '2000-01-01';

    const onChangeMock = jest.fn();
    component.registerOnChange(onChangeMock);

    component.value = moment(date);

    expect(onChangeMock).toHaveBeenCalledWith(date);
    expect(component.value).toBe(date);
  });

  it('should handle writeValue correctly', () => {
    const date = '2001-02-03';
    component.writeValue(moment(date));

    expect(component.value).toBe(date);
  });

  it('should call onTouched when value changes', () => {
    const onTouchedMock = jest.fn();
    component.registerOnTouched(onTouchedMock);

    component.value = moment('2000-01-01');

    expect(onTouchedMock).toHaveBeenCalled();
  });
});
