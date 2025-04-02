import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { DatepickerComponent } from '../date-picker/datepicker.component';
import { InputStore } from './store/input.store';
import { Input } from './store/input.store.interfaces';

@Component({
  selector: 'lib-input-lib',
  standalone: true,
  imports: [
    CommonModule,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxInputModule,
    NxErrorModule,
    NxButtonModule,
    DatepickerComponent,
  ],
  templateUrl: './input-lib.component.html',
})
export class InputLibComponent {
  protected readonly inputStore = inject(InputStore);

  updateInputs(input: Input): void {
    this.inputStore.updateInputs(input);
  }

  async calculate(): Promise<void> {
    await this.inputStore.calculate();
  }
}
