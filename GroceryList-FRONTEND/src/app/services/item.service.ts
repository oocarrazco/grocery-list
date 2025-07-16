import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroceryItem } from '../models/grocery-item.model';
import { LoggingService } from './logging.service';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = '/api/Item';

  constructor(private http: HttpClient, private loggingService: LoggingService) {}

  getGroceryItems(): Observable<GroceryItem[]> {
    this.loggingService.log('Fetching grocery items');
    return this.http.get<GroceryItem[]>(this.apiUrl);
  }

  addGroceryItem({ item }: { item: Partial<GroceryItem>; }): Observable<GroceryItem> {
    this.loggingService.log('Adding grocery item', item);
    return this.http.post<GroceryItem>(this.apiUrl, item);
  }

  updateGroceryItem({ id, item }: { id: number; item: Partial<GroceryItem>; }): Observable<GroceryItem> {
    this.loggingService.log('Updating grocery item', { id, item });
    return this.http.put<GroceryItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteGroceryItem({ id }: { id: number; }): Observable<void> {
    this.loggingService.log('Deleting grocery item', { id });
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  togglePurchaseStatus({ id, isPurchased }: { id: number; isPurchased: boolean; }): Observable<GroceryItem> {
    this.loggingService.log('Toggling purchase status', { id, isPurchased });
    return this.http.patch<GroceryItem>(`${this.apiUrl}/${id}/toggle-purchase`, { isPurchased: isPurchased });
  }
}
