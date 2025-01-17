import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxDatefieldDirective, NxDatepickerComponent, NxDatepickerToggleComponent, NxNativeDateModule } from '@aposin/ng-aquila/datefield';
import { NxDropdownComponent, NxDropdownItemComponent } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxColComponent, NxLayoutComponent, NxRowComponent } from '@aposin/ng-aquila/grid';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { InputStore } from './store/input.store';
import { Input, InputStatePropertiesEnum } from './store/input.store.interfaces';

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
    NxDropdownItemComponent,
    NxInputModule,
    NxErrorModule,
    NxButtonModule,
    NxNativeDateModule
  ],
  templateUrl: './input-lib.component.html',
})
export class InputLibComponent {
  protected readonly inputStore = inject(InputStore);
  protected readonly viewStateInputProperties = InputStatePropertiesEnum;

  protected readonly validState = computed(() => {
    const signalsOfValidity = Object.values(this.viewStateInputProperties).map((key) => 
       this.inputStore.uiState()[key].valid    
    );

    return !signalsOfValidity.some(signal => !signal); 
  })

  updateInputs(input: Input): void {
    this.inputStore.updateInputs(input);
  }

  async calculate(): Promise<void> {
    await this.inputStore.calculate();
  }
}
