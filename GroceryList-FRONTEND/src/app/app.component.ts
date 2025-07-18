

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroceryListService } from './services/grocery-list.service';
import { GroceryList } from './models/grocery-list.model';

import { ConfirmationService, ConfirmationRequest } from './services/confirmation.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemDetailComponent } from './components/item/item-detail/item-detail.component';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-grocery-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    ConfirmDialogComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class GroceryListComponent implements OnInit {
  groceryLists: GroceryList[] = [];

  // Confirmation dialog state
  confirmMessage: string | null = null;
  private confirmResolve?: (value: boolean) => void;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private groceryListService: GroceryListService,
    public authService: AuthService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    // Subscribe to confirmation requests
    this.confirmationService.requests$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((req: ConfirmationRequest) => {
        this.confirmMessage = req.message;
        this.confirmResolve = req.resolve;
      });

    if (this.authService.isLoggedIn()) {
      this.loadGroceryLists();
    }
  }

  // No manual ngOnDestroy needed; takeUntilDestroyed handles cleanup

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
  
  onDialogResult(result: boolean) {
    if (this.confirmResolve) {
      this.confirmResolve(result);
    }
    this.confirmMessage = null;
    this.confirmResolve = undefined;
  }
}
