import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ConfirmationRequest {
  message: string;
  resolve: (result: boolean) => void;
}

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  private requestSubject = new Subject<ConfirmationRequest>();
  // Observable used by the host component to display the dialog
  requests$ = this.requestSubject.asObservable();

  confirm(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.requestSubject.next({ message, resolve });
    });
  }
} 