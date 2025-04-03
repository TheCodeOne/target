import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxFormfieldErrorDirective } from '@aposin/ng-aquila/formfield';
import { ApiError, ApiErrorResponse } from '@target/interfaces';

@Component({
  selector: 'lib-error-box',
  imports: [CommonModule, NxErrorComponent, NxFormfieldErrorDirective],
  templateUrl: './error-box.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorBoxComponent {
  @Input()
  set errorMessage(value: ApiErrorResponse) {
    if (!value) {
      this.apiErrorMessage.set({ message: [] } as ApiError);
    }

    const error: ApiError = Array.isArray(value.message)
      ? (value as ApiError)
      : {
          ...value,
          message: value.message ? [value.message] : [],
        };

    this.apiErrorMessage.set(error);
  }

  protected apiErrorMessage = signal<ApiError>({ message: [] } as ApiError);
}
