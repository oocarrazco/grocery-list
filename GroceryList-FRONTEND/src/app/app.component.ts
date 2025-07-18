

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroceryListService } from './services/grocery-list.service';
import { GroceryList } from './models/grocery-list.model';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemDetailComponent } from './components/item/item-detail/item-detail.component';
import { GroceryListManagerComponent } from './components/grocery-list-manager/grocery-list-manager.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-grocery-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    GroceryListManagerComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class GroceryListComponent implements OnInit {
  groceryLists: GroceryList[] = [];

  constructor(private groceryListService: GroceryListService, public authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.loadGroceryLists();
    }
  }

  loadGroceryLists(): void {
    this.groceryListService.getGroceryLists().subscribe({
      next: (lists) => {
        this.groceryLists = lists.filter(list => list != null);
      },
      error: (error) => console.error('Error loading grocery lists:', error)
    });
  }

  afterLogin(): void {
    this.loadGroceryLists();
  }
}
