import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';
import { ApiErrorResponse } from '@target/interfaces';
import { ErrorBoxComponent } from '@target/ui-lib';

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
    NxSpinnerComponent,
    ErrorBoxComponent,
  ],
  templateUrl: './input-lib.component.html',
})
export class InputLibComponent {
  protected readonly inputStore = inject(InputStore);
  private readonly router = inject(Router);

  protected isProcessingData = signal<boolean>(false);
  protected errorResponse = signal<ApiErrorResponse>({} as ApiErrorResponse);

  updateInputs(input: Input): void {
    this.isProcessingData.set(true);

    this.inputStore
      .updateInputs(input)
      .then(() => this.isProcessingData.set(false));
  }

  calculate(): void {
    this.isProcessingData.set(true);

    this.inputStore
      .calculate()
      .then(async (res) => {
        await this.router.navigate(['/view', res]);
        this.isProcessingData.set(false);
      })
      .catch((err) => {
        if (err.status === 400)
          this.inputStore.processErrors(err.error.message);
        else this.errorResponse.set(err.error);

        this.isProcessingData.set(false);
      });
  }
}
