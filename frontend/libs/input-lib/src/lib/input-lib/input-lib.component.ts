import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxDropdownComponent } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxIsoDateModule } from '@aposin/ng-aquila/iso-date-adapter';
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';
import { ApiErrorResponse } from '@target/interfaces';
import { ErrorBoxComponent } from '@target/ui-lib';
import {
  beitragszahlungsweiseOpts,
  berechnungDerLaufzeitOpts,
  leistungsVorgabeOpts,
  rentenzahlungsweiseOpts,
} from '@target/validations';
import { debounceTime } from 'rxjs';

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
    NxIsoDateModule,
    NxDropdownComponent,
    NxInputModule,
    NxErrorModule,
    NxButtonModule,
    NxSpinnerComponent,
    ErrorBoxComponent,
    FormsModule,
    ReactiveFormsModule,
    DatepickerComponent,
  ],
  templateUrl: './input-lib.component.html',
})
export class InputLibComponent implements OnInit {
  protected readonly inputStore = inject(InputStore);

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected isProcessingData = signal<boolean>(false);
  protected errorResponse = signal<ApiErrorResponse>({} as ApiErrorResponse);

  protected readonly leistungsVorgabeOpts = leistungsVorgabeOpts;
  protected readonly berechnungDerLaufzeitOpts = berechnungDerLaufzeitOpts;
  protected readonly beitragszahlungsweiseOpts = beitragszahlungsweiseOpts;
  protected readonly rentenzahlungsweiseOpts = rentenzahlungsweiseOpts;

  protected profile = this.formBuilder.group({
    geburtsdatum: [this.inputStore.uiState()['geburtsdatum'].value],
    leistungsVorgabe: [this.inputStore.uiState()['leistungsVorgabe'].value],
    beitrag: [this.inputStore.uiState()['beitrag'].value],
    berechnungDerLaufzeit: [
      this.inputStore.uiState().berechnungDerLaufzeit.value,
    ],
    laufzeit: [this.inputStore.uiState().laufzeit.value],
    beitragszahlungsweise: [
      this.inputStore.uiState().beitragszahlungsweise.value,
    ],
    rentenzahlungsweise: [this.inputStore.uiState().rentenzahlungsweise.value],
  });

  ngOnInit(): void {
    this.profile.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(100))
      .subscribe((values) => {
        this.isProcessingData.set(true);

        const input: Input[] = Object.entries(values).map(
          ([key, value]) =>
            ({
              key,
              value,
            } as Input)
        );

        this.inputStore
          .updateInputs(input)
          .then(() => this.isProcessingData.set(false));
      });
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
