import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NxDataDisplayComponent } from '@aposin/ng-aquila/data-display';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { QuoteStore } from '@target/quota-store-lib';

@Component({
  selector: 'lib-view-lib',
  imports: [
    CommonModule,
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxDataDisplayComponent,
  ],
  templateUrl: './view-lib.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewLibComponent {
  protected readonly quoteStore = inject(QuoteStore);

  protected readonly state = this.quoteStore.quoteState();
}
