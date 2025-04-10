import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
  NxDateAdapter,
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';
import moment, { Moment } from 'moment/moment';

@Component({
  selector: 'lib-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    NxInputModule,
    NxMomentDateModule,
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
    NxErrorComponent,
    NxFormfieldComponent,
    FormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
  templateUrl: './datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements ControlValueAccessor {
  protected readonly adapter = inject(NxDateAdapter);

  protected minDate = moment().subtract(100, 'years');
  protected maxDate = moment().subtract(18, 'years');

  private _value: string = '';

  private onChange: any = () => {};
  private onTouched: any = () => {};

  get value(): string {
    return this._value;
  }

  set value(val: Moment) {
    this._value = val?.format('YYYY-MM-DD');

    this.onChange(val?.format('YYYY-MM-DD'));
    this.onTouched();
  }

  writeValue(value: Moment): void {
    if (value) {
      this._value = value.format('YYYY-MM-DD');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(_: boolean): void {}
}
