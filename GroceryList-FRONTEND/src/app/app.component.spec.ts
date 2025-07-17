// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { GroceryListComponent } from './app.component';
// import { ItemService } from './services/item.service';
// import { of } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { GroceryItem } from './models/grocery-item.model';
// import { BrowserModule } from '@angular/platform-browser';

// @Injectable({
//   providedIn: 'root'
// })
// class MockItemService {
//   getGroceryItems() {
//     return of([
//       { id: 1, name: 'Apple', quantity: 1, isPurchased: false, createdAt: new Date(2025, 0, 30), updatedAt: new Date(2025, 0, 30) },
//       { id: 2, name: 'Banana', quantity: 2, isPurchased: false, createdAt: new Date(2025, 0, 30), updatedAt: new Date(2025, 0, 30) },
//       { id: 3, name: 'Carrot', quantity: 3, isPurchased: false, createdAt: new Date(2025, 0, 30), updatedAt: new Date(2025, 0, 30) }
//     ] as GroceryItem[]);
//   }
// }

// describe('GroceryListComponent', () => {
//   let component: GroceryListComponent;
//   let service: ItemService;
//   let fixture: ComponentFixture<GroceryListComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [GroceryListComponent, BrowserModule],
//       providers: [{ provide: ItemService, useClass: MockItemService }]
//     });
//     service = TestBed.inject(ItemService);
//     fixture = TestBed.createComponent(GroceryListComponent);
//     component = fixture.componentInstance;
//     component = TestBed.createComponent(GroceryListComponent).componentInstance;
//   });

//   it('should load grocery items on init', () => {
//     spyOn(service, 'getGroceryItems').and.callThrough();

//     component.ngOnInit();

//     expect(service.getGroceryItems).toHaveBeenCalled();

//     expect(component.groceryItems).toEqual([
//       { id: 1, name: 'Apple', quantity: 1, isPurchased: false, createdAt: new Date(2025, 0, 30), updatedAt: new Date(2025, 0, 30) },
//       { id: 2, name: 'Banana', quantity: 2, isPurchased: false, createdAt: new Date(2025, 0, 30), updatedAt: new Date(2025, 0, 30) },
//       { id: 3, name: 'Carrot', quantity: 3, isPurchased: false, createdAt: new Date(2025, 0, 30), updatedAt: new Date(2025, 0, 30) }
//     ]);
//   });

//   it('should display grocery items in the UI after initialization', () => {
//     component.ngOnInit();
//     fixture.detectChanges(); 
  
//     fixture.whenStable().then(() => {
//       fixture.detectChanges();
//       const compiled = fixture.nativeElement;
//       const items = compiled.querySelectorAll('.grocery-item');
//       console.log(component.groceryItems);
//       console.log(`items--- ${items}`);
  
//       expect(items.length).toBe(3);
//       expect(items[0].textContent).toContain('Apple');
//       expect(items[1].textContent).toContain('Banana');
//       expect(items[2].textContent).toContain('Carrot');
//     });
//   });
// });