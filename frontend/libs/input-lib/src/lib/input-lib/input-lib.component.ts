import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import {
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
  NxNativeDateModule,
} from '@aposin/ng-aquila/datefield';
import {
  NxDropdownComponent,
  NxDropdownOption,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';
import { NavigatorService } from '@target/navigation';
import { BeitragszahlungsweiseSchema, BerechnungDerLaufzeitSchema, LeistungsvorgabeSchema, RentenzahlungsweiseSchema } from '@target/validations';
import { debounceTime, skip } from 'rxjs';

import { InputStore } from './store/input.store';
import {
  Input,
  InputStatePropertiesEnum,
} from './store/input.store.interfaces';

@Component({
  selector: 'lib-input-lib',
  imports: [
    CommonModule,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDatepickerComponent,
    NxDatefieldDirective,
    NxDatepickerToggleComponent,
    NxDropdownComponent,
    NxSpinnerComponent,
    NxInputModule,
    NxErrorModule,
    NxButtonModule,
    NxNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-lib.component.html',
})
export class InputLibComponent {
  private readonly navigator = inject(NavigatorService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly inputStore = inject(InputStore);
  protected readonly viewStateInputProperties = InputStatePropertiesEnum;
  protected readonly calculateProcess = signal<boolean | undefined>(undefined);
  protected readonly controlOptions: Partial<Record<InputStatePropertiesEnum, NxDropdownOption[]>> = {
    [InputStatePropertiesEnum.LeistungsVorgabe]: LeistungsvorgabeSchema.options.map((value) => ({ value })),
    [InputStatePropertiesEnum.BerechnungDerLaufzeit]: BerechnungDerLaufzeitSchema.options.map((value) => ({ value })),
    [InputStatePropertiesEnum.Beitragszahlungsweise]: BeitragszahlungsweiseSchema.options.map((value) => ({ value })),
    [InputStatePropertiesEnum.Rentenzahlungsweise]: RentenzahlungsweiseSchema.options.map((value) => ({ value: value.value })),
  };

  protected readonly form = new FormBuilder().group(
    Object.fromEntries(
      Object.values(InputStatePropertiesEnum).map((controlName) => [
        controlName,
        this.createFormControl(controlName),
      ])
    ) as Record<InputStatePropertiesEnum, FormControl>
  );

  protected readonly validState = computed(() => {
    const signalsOfValidity = Object.values(this.viewStateInputProperties).map(
      (key) => this.inputStore.uiState()[key].valid
    );

    return !signalsOfValidity.some((signal) => !signal);
  });

  protected readonly formDisabled = computed(
    () => this.calculateProcess() as boolean
  );

  protected readonly disabledFormEffect = effect(() => {
    const disabled = this.formDisabled();

    disabled ? this.form.disable() : this.form.enable();
  });

  updateInputs(input: Input): void {
    this.inputStore.updateInputs(input);
  }

  async calculate(): Promise<void> {
    try {
      this.calculateProcess.set(true);
      const calculatedQuoteId = await this.inputStore.calculate();

      this.navigator.toQuote(calculatedQuoteId);
    } finally {
      this.calculateProcess.set(false);
    }
  }

  private createFormControl(initValueFromStateKey: InputStatePropertiesEnum): FormControl {
    const formControl = new FormControl(
      this.inputStore.uiState()[
        initValueFromStateKey
      ].value
    );

    formControl.valueChanges
      .pipe(skip(1), takeUntilDestroyed(this.destroyRef), debounceTime(300))
      .subscribe((valueChanges) => {
        this.inputStore.updateInputs({
          key: initValueFromStateKey,
          value: valueChanges as any,
        });
      });

    return formControl;
  }
}
