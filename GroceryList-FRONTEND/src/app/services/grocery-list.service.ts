
import { Injectable } from '@angular/core';
import { GroceryList } from '../models/grocery-list.model';
import { GroceryItem } from '../models/grocery-item.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private apiUrl = `${environment.apiUrl}/api/GroceryList`;

  constructor(private http: HttpClient, private loggingService: LoggingService, private authService: AuthService) {}

  /**
   * Retrieves all grocery lists for the current logged-in user.
   */
  getGroceryLists(): Observable<GroceryList[]> {
    this.loggingService.log('Fetching grocery lists');
    const params: any = {};
    const uid = this.authService.userId;
    if (uid) params.userId = uid;
    return this.http.get<GroceryList[]>(this.apiUrl, { params });
  }

  /**
   * Creates a new grocery list with the provided name.
   * @param name The display name of the list.
   */
  addGroceryList(name: string): Observable<GroceryList> {
    this.loggingService.log('Adding grocery list', name);
    return this.http.post<GroceryList>(this.apiUrl, { name, userId: this.authService.userId });
  }

  /**
   * Renames an existing list.
   * @param id List id.
   * @param newName The new name.
   */
  renameGroceryList(id: number, newName: string, items: any[] = []): Observable<GroceryList> {
    this.loggingService.log('Renaming grocery list', { id, newName });
    return this.http.put<GroceryList>(`${this.apiUrl}/${id}`, { name: newName });
  }

  /**
   * Deletes a grocery list.
   */
  deleteGroceryList(id: number): Observable<void> {
    this.loggingService.log('Deleting grocery list', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Gets a single grocery list by id. */
  getGroceryListById(id: number): Observable<GroceryList> {
    this.loggingService.log('Fetching grocery list by id', id);
    return this.http.get<GroceryList>(`${this.apiUrl}/${id}`);
  }

  // Item management: update the list with the new items array
  /** Updates list metadata. */
  updateGroceryList(list: GroceryList): Observable<GroceryList> {
    this.loggingService.log('Updating grocery list', list);
    return this.http.put<GroceryList>(`${this.apiUrl}/${list.id}`, { name: list.name });
  }
}
