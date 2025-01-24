import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DestroyRef, Directive, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { ErrorToastrComponent } from '../../components';
import { InterceptionBusService } from '../../services';

@Directive({
  selector: '[libHttpErrorToastr]',
})
export class HttpErrorToastrDirective implements OnInit, OnDestroy {
  private errorToasts: { [key: string]: OverlayRef } = {}; // Dictionary of visible toasts

  private readonly overlay = inject(Overlay);
  private readonly errorInterceptorBus = inject(InterceptionBusService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.errorInterceptorBus.errorMessages$
      .pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean))
      .subscribe((message) => {
        this.showOverlay(message);
      });
  }

  ngOnDestroy(): void {
    Object.values(this.errorToasts).forEach((overlayRef) => overlayRef.dispose());
  }

  private showOverlay(message: string): void {
    const positionStrategy: PositionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .top(`${Object.keys(this.errorToasts).length * 120}px`);
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
    });
    const toastPortal = new ComponentPortal(ErrorToastrComponent);
    const toastComponentRef = overlayRef.attach(toastPortal);
    const toastId = this.generateToastId();

    if (toastComponentRef.instance) {
      toastComponentRef.instance.message = message;

      toastComponentRef.instance.closed
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.removeToast(toastId));
    }

    this.errorToasts[toastId] = overlayRef;
  }

  private removeToast(toastId: string): void {
    const overlayRef = this.errorToasts[toastId];

    if (overlayRef) {
      overlayRef.detach();
      overlayRef.dispose();
      delete this.errorToasts[toastId];
    }
  }

  private generateToastId(): string {
    return `toast-${(Object.keys(this.errorToasts)?.length || 0) + 1}`;
  }
}
