import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
  NxDateAdapter,
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerInputEvent,
  NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';
import moment from 'moment/moment';

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
  ],
  templateUrl: './datepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  // TODO: force input date format to DD-MM-YYYY
  @Input()
  set value(vle: string) {
    this.geburtsdatum.set(this.adapter.parse(vle, 'YYYY-MM-DD', true));
  }

  @Output() dateChange: EventEmitter<string> = new EventEmitter();

  protected readonly adapter = inject(NxDateAdapter);

  protected geburtsdatum = signal<string>('');

  protected minDate = moment().subtract(100, 'years');
  protected maxDate = moment().subtract(18, 'years');

  updateDate($event: NxDatepickerInputEvent<any>): void {
    this.dateChange.emit($event.target.value?.format('YYYY-MM-DD'));
  }
}
