import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

@Component({
  selector: 'lib-error-toastr',
  imports: [CommonModule, NxMessageComponent],
  templateUrl: './error-toastr.component.html',
})
export class ErrorToastrComponent {
  @Input() message!: string;
  @Output() readonly closed = new EventEmitter<void>();
}
