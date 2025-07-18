import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';
import { LoggingService } from './logging.service';

describe('ItemService', () => {
  let service: ItemService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService, LoggingService]
    });
    service = TestBed.inject(ItemService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should toggle purchase status', () => {
    const response: any = { id: 5, name: 'Apple', isPurchased: true };
    service.togglePurchaseStatus({ id: 5, isPurchased: true }).subscribe(r => expect(r).toEqual(response));

    const req = http.expectOne(r => r.method === 'PATCH' && r.url.endsWith('/api/Item/5/toggle-purchase'));
    expect(req.request.body).toEqual({ isPurchased: true });
    req.flush(response);
  });
}); 