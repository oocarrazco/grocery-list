import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  message?: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = `${environment.apiUrl}/api/Auth/login`;
  private readonly storageKey = 'gl_logged_in';
  private readonly usernameKey = 'gl_username';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password }).pipe(
      tap((res) => {
        // Login successful
        localStorage.setItem(this.storageKey, 'true');
        localStorage.setItem(this.usernameKey, username);
        if (res.userId) {
          localStorage.setItem('gl_userId', res.userId.toString());
        }
        this.loggedInSubject.next(true);
      })
    );
  }

  register(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/Auth/register`, { username, password });
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem('gl_userId');
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  get currentUser(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  get userId(): number | null {
    const val = localStorage.getItem('gl_userId');
    return val ? Number(val) : null;
  }
} 