import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);

    // ensure clean localStorage between tests
    localStorage.clear();
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('should store login flags and userId on successful login', () => {
    service.login('bob', 'pass').subscribe(r => expect(r.success).toBeTrue());
    const req = http.expectOne(r => r.method === 'POST' && r.url.endsWith('/api/Auth/login'));
    req.flush({ success: true, userId: 3 });

    expect(localStorage.getItem('gl_logged_in')).toBe('true');
    expect(localStorage.getItem('gl_username')).toBe('bob');
    expect(localStorage.getItem('gl_userId')).toBe('3');
    expect(service.userId).toBe(3);
  });
}); 