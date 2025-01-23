import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  NxDataDisplayComponent,
} from '@aposin/ng-aquila/data-display';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';
import { distinctUntilChanged, filter, map } from 'rxjs';

import { QuoteStateService } from './store/services';
import { obectKeys, transformToTitleCase } from './untility.functions';



@Component({
  selector: 'lib-quote-lib',
  imports: [CommonModule, NxLayoutComponent, NxRowComponent, NxColComponent, NxSpinnerComponent,  NxDataDisplayComponent],
  standalone: true,
  templateUrl: './quote-lib.component.html',
})
export class QuoteLibComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly quoteState = inject(QuoteStateService);

  protected readonly transformToTitleCase = transformToTitleCase;
  protected readonly obectKeys = obectKeys;

  ngOnInit(): void {
    const quoteIdQueryParam$ = this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef),
      map((query) => query['quoteId'] as string),
      filter(Boolean),
      distinctUntilChanged()
    );

    this.quoteState.loadQuote(quoteIdQueryParam$);
  }
}
