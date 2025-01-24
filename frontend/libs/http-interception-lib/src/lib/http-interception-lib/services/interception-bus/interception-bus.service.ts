import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class InterceptionBusService {
  private readonly errorMessagesSubject = new Subject<string>();
  readonly errorMessages$: Observable<string> = this.errorMessagesSubject.asObservable();

  notifyError(message: string): void {
    this.errorMessagesSubject.next(message);
  }
}
