import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  log(message: string, ...optionalParams: any[]) {
    console.log('[LOG]', message, ...optionalParams);
  }

  error(message: string, ...optionalParams: any[]) {
    console.error('[ERROR]', message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    console.warn('[WARN]', message, ...optionalParams);
  }
}
