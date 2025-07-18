import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GroceryListService } from './grocery-list.service';
import { LoggingService } from './logging.service';
import { AuthService } from './auth.service';
import { GroceryList } from '../models/grocery-list.model';

class AuthStub {
  userId = 1;
  isLoggedIn() { return true; }
}

describe('GroceryListService', () => {
  let service: GroceryListService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GroceryListService,
        LoggingService,
        { provide: AuthService, useClass: AuthStub }
      ]
    });
    service = TestBed.inject(GroceryListService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should GET lists for current user', () => {
    const mock: any[] = [{ id: 1, name: 'Test', items: [] }];
    service.getGroceryLists().subscribe(r => expect(r).toEqual(mock));
    const req = http.expectOne(r => r.method === 'GET' && r.url.endsWith('/api/GroceryList'));
    expect(req.request.params.get('userId')).toBe('1');
    req.flush(mock);
  });

  it('should POST new list with userId', () => {
    const mock: any = { id: 2, name: 'New', items: [] };
    service.addGroceryList('New').subscribe(r => expect(r).toEqual(mock));
    const req = http.expectOne(r => r.method === 'POST' && r.url.endsWith('/api/GroceryList'));
    expect(req.request.body).toEqual({ name: 'New', userId: 1 });
    req.flush(mock);
  });
}); 